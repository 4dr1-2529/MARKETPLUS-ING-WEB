import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AddressService } from '../../services/address.service';
import { CouponService } from '../../services/coupon.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { Direccion } from '../../models/address.model';
import { fadeInAnimation } from '../../shared/animations';
import {
    NAME_REGEX,
    COMPRA_EXITO_DETALLE,
    COMPRA_EXITO_PAGO,
    PAGO_FORM_HINT,
    TIENDA_INFO,
    TipoComprobante,
    TipoEntrega,
    formatCardNumberDisplay,
    formatExpiryInput,
    isCardNumber,
    isCvv,
    isDni,
    isExpiryDate,
    isPhone,
    isRuc,
    normalizeTipoEntrega,
    lettersOnlyError,
    onLettersInput,
    onNumericInput
} from '../../utils/form-validation.util';

type MetodoPago = 'yape' | 'tarjeta_visa' | 'contra_entrega';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.css'],
    animations: [fadeInAnimation]
})
export class CheckoutPage implements OnInit {
    cartItems: any[] = [];
    subtotal = 0;
    loading = false;
    submitted = false;

    showOrderSuccess = false;
    lastOrder: any = null;

    addresses: Direccion[] = [];
    addressesLoading = true;

    cuponCodigo = '';
    cuponAplicado = false;
    cuponDescuento = 0;
    cuponValidando = false;

    checkoutData = {
        direccion_id: '',
        metodo_pago: 'yape' as MetodoPago,
        notas: ''
    };

    tipoComprobante: TipoComprobante = 'boleta';
    comprobanteDni = '';
    comprobanteNombre = '';
    comprobanteRuc = '';
    comprobanteRazonSocial = '';
    comprobanteDireccionFiscal = '';

    paymentData = {
        numero_tarjeta: '',
        fecha_vencimiento: '',
        cvv: '',
        titular: '',
        telefono_yape: '',
        codigo_operacion: ''
    };

    showAddressModal = false;
    addressSubmitted = false;
    editingAddressId: number | null = null;
    newAddress: Partial<Direccion> = this.emptyAddress();

    readonly tiendaInfo = TIENDA_INFO;
    readonly pagoFormHint = PAGO_FORM_HINT;
    readonly compraExitoPago = COMPRA_EXITO_PAGO;
    readonly compraExitoDetalle = COMPRA_EXITO_DETALLE;
    constructor(
        private readonly cartService: CartService,
        private readonly orderService: OrderService,
        private readonly addressService: AddressService,
        private readonly couponService: CouponService,
        private readonly toast: ToastService,
        private readonly auth: AuthService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        if (!this.auth.isAuthenticated) {
            this.toast.warning('Inicia sesion para continuar con la compra');
            this.router.navigate(['/login'], { queryParams: { return: '/checkout' } });
            return;
        }
        this.loadCart();
        this.loadAddresses();
        this.loadUserProfile();
    }

    private emptyAddress(): Partial<Direccion> {
        return {
            tipo: 'domicilio',
            destinatario: '',
            direccion_linea1: '',
            departamento: '',
            provincia: 'Huancayo',
            distrito: '',
            referencia: '',
            telefono: '',
            dni_contacto: '',
            es_principal: false
        };
    }

    loadUserProfile(): void {
        this.auth.getProfile().subscribe({
            next: (res) => {
                if (res.data?.dni) this.comprobanteDni = res.data.dni;
                const nombre = [res.data?.nombres, res.data?.apellidos].filter(Boolean).join(' ').trim();
                if (nombre) this.comprobanteNombre = nombre;
            }
        });
    }

    loadCart(): void {
        this.cartService.getCart().subscribe({
            next: (res) => {
                this.cartItems = res.data.items;
                this.subtotal = res.data.subtotal;
                if (!this.cartItems.length) this.router.navigate(['/carrito']);
            },
            error: () => this.router.navigate(['/carrito'])
        });
    }

    loadAddresses(): void {
        this.addressesLoading = true;
        this.addressService.getAll().subscribe({
            next: (res) => {
                this.addresses = res.data.map(a => ({
                    ...a,
                    tipo: normalizeTipoEntrega(String(a.tipo))
                }));
                this.addressesLoading = false;
                const primary = this.addresses.find(a => a.es_principal);
                if (primary?.id) this.checkoutData.direccion_id = String(primary.id);
            },
            error: () => {
                this.addressesLoading = false;
                this.toast.error('Error al cargar direcciones');
            }
        });
    }

    get selectedAddress(): Direccion | undefined {
        return this.addresses.find(a => String(a.id) === this.checkoutData.direccion_id);
    }

    get canUseContraEntrega(): boolean {
        return normalizeTipoEntrega(this.selectedAddress?.tipo) === 'domicilio';
    }

    get isYape(): boolean { return this.checkoutData.metodo_pago === 'yape'; }
    get isVisa(): boolean { return this.checkoutData.metodo_pago === 'tarjeta_visa'; }
    get isContraEntrega(): boolean { return this.checkoutData.metodo_pago === 'contra_entrega'; }

    get cardNumberDisplay(): string {
        return formatCardNumberDisplay(this.paymentData.numero_tarjeta);
    }

    getIgv(): number { return this.subtotal * 0.18; }
    getShipping(): number { return this.subtotal >= 200 ? 0 : 15; }
    getDiscount(): number { return this.cuponDescuento; }
    getTotal(): number { return this.subtotal + this.getIgv() + this.getShipping() - this.getDiscount(); }

    get isDomicilioForm(): boolean {
        return normalizeTipoEntrega(this.newAddress.tipo) === 'domicilio';
    }

    get destinatarioError(): string {
        return lettersOnlyError(this.newAddress.destinatario || '', 'El nombre', 3);
    }

    get direccionError(): string {
        if (!this.isDomicilioForm) return '';
        const v = (this.newAddress.direccion_linea1 || '').trim();
        if (!v) return 'La direccion es obligatoria';
        if (v.length < 5) return 'Minimo 5 caracteres';
        return '';
    }

    get departamentoError(): string {
        if (!this.isDomicilioForm) return '';
        return lettersOnlyError(this.newAddress.departamento || '', 'Departamento');
    }

    get provinciaError(): string {
        if (!this.isDomicilioForm) return '';
        return lettersOnlyError(this.newAddress.provincia || '', 'Provincia');
    }

    get distritoError(): string {
        if (!this.isDomicilioForm) return '';
        return lettersOnlyError(this.newAddress.distrito || '', 'Distrito');
    }

    get telefonoAddressError(): string {
        const v = (this.newAddress.telefono || '').trim();
        if (!v) return 'El telefono es obligatorio';
        if (!isPhone(v)) return 'Exactamente 9 digitos';
        return '';
    }

    get dniRecojoError(): string {
        if (this.isDomicilioForm) return '';
        const v = (this.newAddress.dni_contacto || '').trim();
        if (!v) return 'El DNI es obligatorio';
        if (!isDni(v)) return 'Exactamente 8 digitos';
        return '';
    }

    get isAddressFormValid(): boolean {
        return !this.getAddressValidationMessage();
    }

    getAddressValidationMessage(): string {
        if (this.destinatarioError) return this.destinatarioError;
        if (this.telefonoAddressError) return this.telefonoAddressError;
        if (this.isDomicilioForm) {
            return this.direccionError || this.departamentoError || this.provinciaError || this.distritoError || '';
        }
        return this.dniRecojoError;
    }

    get comprobanteNombreError(): string {
        if (this.tipoComprobante !== 'boleta') return '';
        return lettersOnlyError(this.comprobanteNombre, 'El nombre completo', 3);
    }

    get comprobanteDniError(): string {
        if (this.tipoComprobante !== 'boleta') return '';
        if (!this.comprobanteDni.trim()) return 'El DNI es obligatorio';
        if (!isDni(this.comprobanteDni)) return 'Exactamente 8 digitos';
        return '';
    }

    get comprobanteRucError(): string {
        if (this.tipoComprobante !== 'factura') return '';
        if (!this.comprobanteRuc.trim()) return 'El RUC es obligatorio';
        if (!isRuc(this.comprobanteRuc)) return 'Exactamente 11 digitos';
        return '';
    }

    get razonSocialError(): string {
        if (this.tipoComprobante !== 'factura') return '';
        const v = this.comprobanteRazonSocial.trim();
        if (!v) return 'La razon social es obligatoria';
        if (v.length < 3) return 'Minimo 3 caracteres';
        return '';
    }

    get direccionFiscalError(): string {
        if (this.tipoComprobante !== 'factura') return '';
        const v = this.comprobanteDireccionFiscal.trim();
        if (!v) return 'La direccion fiscal es obligatoria';
        if (v.length < 5) return 'Minimo 5 caracteres';
        return '';
    }

    get isComprobanteValid(): boolean {
        if (this.tipoComprobante === 'boleta') {
            return !this.comprobanteDniError && !this.comprobanteNombreError;
        }
        return !this.comprobanteRucError && !this.razonSocialError && !this.direccionFiscalError;
    }

    get cardNumberError(): string {
        if (!this.isVisa) return '';
        if (!this.paymentData.numero_tarjeta) return 'Numero de tarjeta obligatorio';
        if (!isCardNumber(this.paymentData.numero_tarjeta)) return 'Debe tener 16 digitos';
        return '';
    }

    get expiryError(): string {
        if (!this.isVisa) return '';
        if (!this.paymentData.fecha_vencimiento) return 'Fecha obligatoria (MM/AA)';
        if (!isExpiryDate(this.paymentData.fecha_vencimiento)) return 'Fecha invalida o vencida';
        return '';
    }

    get cvvError(): string {
        if (!this.isVisa) return '';
        if (!this.paymentData.cvv) return 'CVV obligatorio';
        if (!isCvv(this.paymentData.cvv)) return 'Debe tener 3 digitos';
        return '';
    }

    get titularError(): string {
        if (!this.isVisa) return '';
        return lettersOnlyError(this.paymentData.titular, 'Nombre del titular', 3);
    }

    get yapePhoneError(): string {
        if (!this.isYape) return '';
        if (!this.paymentData.telefono_yape) return 'Numero Yape obligatorio';
        if (!isPhone(this.paymentData.telefono_yape)) return 'Exactamente 9 digitos';
        return '';
    }

    get operationCodeError(): string {
        if (!this.isYape) return '';
        const v = this.paymentData.codigo_operacion.trim();
        if (!v) return 'Codigo de operacion obligatorio';
        if (v.length < 6) return 'Minimo 6 caracteres';
        return '';
    }

    get isPaymentValid(): boolean {
        if (this.isContraEntrega) return this.canUseContraEntrega;
        if (this.isVisa) {
            return !this.cardNumberError && !this.expiryError && !this.cvvError && !this.titularError;
        }
        if (this.isYape) return !this.yapePhoneError && !this.operationCodeError;
        return false;
    }

    get isCheckoutValid(): boolean {
        return this.cartItems.length > 0 &&
            !!this.checkoutData.direccion_id &&
            this.isComprobanteValid &&
            this.isPaymentValid;
    }

    onTipoEntregaChange(tipo: TipoEntrega): void {
        this.newAddress.tipo = tipo;
        if (tipo === 'recojo_tienda') {
            this.newAddress.direccion_linea1 = 'Recojo en tienda MarketPlus - Av. Junin 1234, Huancayo';
            this.newAddress.departamento = 'Junin';
            this.newAddress.provincia = 'Huancayo';
            this.newAddress.distrito = 'Huancayo';
        } else {
            this.newAddress.departamento = '';
            this.newAddress.provincia = '';
            this.newAddress.distrito = '';
        }
    }

    onCardNumberInput(event: Event): void {
        const value = onNumericInput(event, 16);
        this.paymentData.numero_tarjeta = value;
        (event.target as HTMLInputElement).value = formatCardNumberDisplay(value);
    }

    onNumericField(
        field: 'telefono' | 'dni_contacto' | 'comprobanteDni' | 'comprobanteRuc' | 'cvv' | 'telefono_yape',
        event: Event,
        max: number
    ): void {
        const value = onNumericInput(event, max);
        if (field === 'telefono') this.newAddress.telefono = value;
        if (field === 'dni_contacto') this.newAddress.dni_contacto = value;
        if (field === 'comprobanteDni') this.comprobanteDni = value;
        if (field === 'comprobanteRuc') this.comprobanteRuc = value;
        if (field === 'cvv') this.paymentData.cvv = value;
        if (field === 'telefono_yape') this.paymentData.telefono_yape = value;
    }

    onLettersField(
        field: 'destinatario' | 'departamento' | 'provincia' | 'distrito' | 'comprobanteNombre' | 'titular',
        event: Event
    ): void {
        const value = onLettersInput(event, 80);
        if (field === 'destinatario') this.newAddress.destinatario = value;
        if (field === 'departamento') this.newAddress.departamento = value;
        if (field === 'provincia') this.newAddress.provincia = value;
        if (field === 'distrito') this.newAddress.distrito = value;
        if (field === 'comprobanteNombre') this.comprobanteNombre = value;
        if (field === 'titular') this.paymentData.titular = value;
    }

    onExpiryInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.paymentData.fecha_vencimiento = formatExpiryInput(input.value);
        input.value = this.paymentData.fecha_vencimiento;
    }

    onPaymentMethodChange(): void {
        if (this.isContraEntrega && !this.canUseContraEntrega) {
            this.toast.warning('Contra entrega solo disponible para domicilio');
            this.checkoutData.metodo_pago = 'yape';
        }
    }

    isAddressSelected(id: number | undefined): boolean {
        return !!id && this.checkoutData.direccion_id === String(id);
    }

    selectAddress(id: number): void {
        this.checkoutData.direccion_id = String(id);
        this.onPaymentMethodChange();
    }

    openAddressModal(addr?: Direccion): void {
        this.addressSubmitted = false;
        if (addr) {
            this.editingAddressId = addr.id ?? null;
            this.newAddress = {
                ...addr,
                tipo: normalizeTipoEntrega(String(addr.tipo))
            };
        } else {
            this.editingAddressId = null;
            this.newAddress = this.emptyAddress();
        }
        this.showAddressModal = true;
        document.body.classList.add('modal-open');
    }

    closeAddressModal(): void {
        this.showAddressModal = false;
        this.editingAddressId = null;
        this.addressSubmitted = false;
        document.body.classList.remove('modal-open');
    }

    saveAddress(): void {
        this.addressSubmitted = true;
        const validationMsg = this.getAddressValidationMessage();
        if (validationMsg) {
            this.toast.warning(validationMsg);
            return;
        }

        const payload = { ...this.newAddress, tipo: normalizeTipoEntrega(this.newAddress.tipo) };
        const request = this.editingAddressId
            ? this.addressService.update(this.editingAddressId, payload)
            : this.addressService.create(payload);

        request.subscribe({
            next: (res) => {
                this.toast.success(this.editingAddressId ? 'Entrega actualizada' : 'Entrega agregada');
                this.closeAddressModal();
                this.loadAddresses();
                const newId = this.editingAddressId ?? (res as { data?: { id?: number } }).data?.id;
                if (newId) this.checkoutData.direccion_id = String(newId);
            },
            error: (err) => this.toast.error(err.error?.message || 'No se pudo guardar la entrega')
        });
    }

    deleteAddress(addr: Direccion, event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        if (!addr.id) return;
        if (!confirm('¿Deseas eliminar esta dirección?')) return;

        this.addressService.delete(addr.id).subscribe({
            next: () => {
                this.toast.success('Direccion eliminada');
                if (this.checkoutData.direccion_id === String(addr.id)) {
                    this.checkoutData.direccion_id = '';
                }
                this.loadAddresses();
            },
            error: (err) => this.toast.error(err.error?.message || 'No se pudo eliminar la direccion')
        });
    }

    getFullAddress(addr: Direccion): string {
        const tipo = normalizeTipoEntrega(addr.tipo);
        if (tipo === 'recojo_tienda') {
            return `${this.tiendaInfo} Av. Junin 1234, Huancayo — Recoge: ${addr.destinatario}`;
        }
        return [addr.direccion_linea1, addr.distrito, addr.provincia, addr.departamento].filter(Boolean).join(', ');
    }

    getTipoEntregaLabel(tipo: string): string {
        return normalizeTipoEntrega(tipo) === 'recojo_tienda' ? 'Recojo en tienda' : 'Domicilio';
    }

    validateCoupon(): void {
        if (!this.cuponCodigo.trim()) {
            this.toast.warning('Ingresa un codigo de cupon');
            return;
        }
        this.cuponValidando = true;
        this.couponService.validate(this.cuponCodigo.trim(), this.subtotal).subscribe({
            next: (res) => {
                this.cuponValidando = false;
                if (res.success && res.data) {
                    this.cuponAplicado = true;
                    this.cuponDescuento = res.data.discount ?? res.data.descuento ?? 0;
                    this.toast.success('Cupon aplicado');
                } else {
                    this.toast.warning(res.message || 'Cupon no valido');
                }
            },
            error: () => {
                this.cuponValidando = false;
                this.toast.error('Error al validar cupon');
            }
        });
    }

    removeCoupon(): void {
        this.cuponAplicado = false;
        this.cuponDescuento = 0;
        this.cuponCodigo = '';
    }

    placeOrder(): void {
        this.submitted = true;
        if (!this.isCheckoutValid) {
            this.toast.warning('Completa entrega, comprobante y pago antes de confirmar');
            return;
        }

        this.loading = true;
        const datosPago: {
            simulado: string;
            numero_tarjeta?: string;
            fecha_vencimiento?: string;
            cvv?: string;
            titular?: string;
            telefono_yape?: string;
            codigo_operacion?: string;
        } = { simulado: 'true' };

        if (this.isVisa) {
            datosPago.numero_tarjeta = this.paymentData.numero_tarjeta;
            datosPago.fecha_vencimiento = this.paymentData.fecha_vencimiento;
            datosPago.cvv = this.paymentData.cvv;
            datosPago.titular = this.paymentData.titular.trim();
        } else if (this.isYape) {
            datosPago.telefono_yape = this.paymentData.telefono_yape;
            datosPago.codigo_operacion = this.paymentData.codigo_operacion.trim();
        }

        const metodoBackend = this.isVisa ? 'tarjeta_credito' : this.checkoutData.metodo_pago;

        this.orderService.createOrder({
            direccion_id: Number(this.checkoutData.direccion_id),
            metodo_pago: metodoBackend,
            cupon_codigo: this.cuponAplicado ? this.cuponCodigo : undefined,
            notas: this.checkoutData.notas,
            tipo_comprobante: this.tipoComprobante,
            comprobante_dni: this.tipoComprobante === 'boleta' ? this.comprobanteDni.trim() : undefined,
            comprobante_nombre: this.tipoComprobante === 'boleta' ? this.comprobanteNombre.trim() : undefined,
            comprobante_ruc: this.tipoComprobante === 'factura' ? this.comprobanteRuc.trim() : undefined,
            comprobante_razon_social: this.tipoComprobante === 'factura' ? this.comprobanteRazonSocial.trim() : undefined,
            comprobante_direccion_fiscal: this.tipoComprobante === 'factura' ? this.comprobanteDireccionFiscal.trim() : undefined,
            datos_pago: datosPago,
            es_pago_simulado: true
        }).subscribe({
            next: (res) => {
                this.loading = false;
                this.cartItems = [];
                this.cartService.updateCount(0);
                const addr = this.selectedAddress;
                this.lastOrder = {
                    numero: res.data?.numero_pedido || 'PED-000000',
                    total: res.data?.total ?? this.getTotal(),
                    items: res.data?.items || [],
                    metodoPago: this.getPaymentMethodName(this.checkoutData.metodo_pago),
                    comprobante: this.tipoComprobante === 'boleta' ? 'Boleta' : 'Factura',
                    direccion: addr ? this.getFullAddress(addr) : '',
                    destinatario: addr?.destinatario || '',
                    simulado: true
                };
                this.showOrderSuccess = true;
                document.body.classList.add('modal-open');
            },
            error: (err) => {
                this.loading = false;
                this.toast.error(err.error?.message || 'Error al procesar la compra');
            }
        });
    }

    getPaymentMethodName(method: string): string {
        const map: Record<string, string> = {
            yape: 'Yape',
            tarjeta_visa: 'Tarjeta Visa',
            tarjeta_credito: 'Tarjeta Visa',
            contra_entrega: 'Contra entrega'
        };
        return map[method] || method;
    }

    closeOrderSuccess(): void {
        this.showOrderSuccess = false;
        document.body.classList.remove('modal-open');
        this.router.navigate(['/mis-pedidos']);
    }

    continueShopping(): void {
        this.showOrderSuccess = false;
        document.body.classList.remove('modal-open');
        this.router.navigate(['/catalogo']);
    }

    showFieldError(showWhenTouched: boolean, error: string): boolean {
        return (showWhenTouched || this.submitted || this.addressSubmitted) && !!error;
    }
}
