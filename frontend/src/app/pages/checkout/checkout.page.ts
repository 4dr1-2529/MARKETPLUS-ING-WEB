import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AddressService } from '../../services/address.service';
import { CouponService } from '../../services/coupon.service';
import { ToastService } from '../../services/toast.service';
import { Direccion } from '../../models/address.model';
import { fadeInAnimation } from '../../shared/animations';

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

    addresses: Direccion[] = [];
    addressesLoading = true;

    cuponCodigo = '';
    cuponAplicado = false;
    cuponDescuento = 0;
    cuponValidando = false;

    checkoutData = {
        direccion_id: '',
        metodo_pago: 'tarjeta_credito',
        notas: ''
    };

    showAddressModal = false;
    newAddress: Partial<Direccion> = {
        tipo: 'casa',
        destinatario: '',
        direccion_linea1: '',
        direccion_linea2: '',
        departamento: '',
        provincia: '',
        distrito: '',
        codigo_postal: '',
        referencia: '',
        telefono: '',
        es_principal: false
    };

    addressErrors: string[] = [];

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private addressService: AddressService,
        private couponService: CouponService,
        private toast: ToastService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadCart();
        this.loadAddresses();
    }

    loadCart(): void {
        this.cartService.getCart().subscribe({
            next: (res) => {
                this.cartItems = res.data.items;
                this.subtotal = res.data.subtotal;
            },
            error: () => this.router.navigate(['/carrito'])
        });
    }

    loadAddresses(): void {
        this.addressesLoading = true;
        this.addressService.getAll().subscribe({
            next: (res) => {
                this.addresses = res.data;
                this.addressesLoading = false;
                const primary = res.data.find(a => a.es_principal);
                if (primary) this.checkoutData.direccion_id = String(primary.id);
            },
            error: () => {
                this.addressesLoading = false;
                this.toast.error('Error al cargar direcciones');
            }
        });
    }

    getIgv(): number { return this.subtotal * 0.18; }
    getShipping(): number { return this.subtotal > 500 ? 0 : 15; }
    getDiscount(): number { return this.cuponDescuento; }
    getTotal(): number { return this.subtotal + this.getIgv() + this.getShipping() - this.getDiscount(); }

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
                    this.cuponDescuento = res.data.descuento;
                    this.toast.success('Cupon aplicado: -S/ ' + this.cuponDescuento.toFixed(2));
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
        this.toast.info('Cupon removido');
    }

    openAddressModal(): void {
        this.newAddress = {
            tipo: 'casa',
            destinatario: '',
            direccion_linea1: '',
            direccion_linea2: '',
            departamento: '',
            provincia: '',
            distrito: '',
            codigo_postal: '',
            referencia: '',
            telefono: '',
            es_principal: false
        };
        this.addressErrors = [];
        this.showAddressModal = true;
    }

    closeAddressModal(): void {
        this.showAddressModal = false;
        this.addressErrors = [];
    }

    validateAddress(): boolean {
        this.addressErrors = [];
        const a = this.newAddress;

        if (!a.destinatario || a.destinatario.trim().length < 3) {
            this.addressErrors.push('El destinatario debe tener al menos 3 caracteres');
        }
        if (!a.direccion_linea1 || a.direccion_linea1.trim().length < 5) {
            this.addressErrors.push('La direccion debe tener al menos 5 caracteres');
        }
        if (!a.departamento) {
            this.addressErrors.push('Selecciona un departamento');
        }
        if (!a.provincia || a.provincia.trim().length < 2) {
            this.addressErrors.push('La provincia es obligatoria');
        }
        if (!a.distrito || a.distrito.trim().length < 2) {
            this.addressErrors.push('El distrito es obligatorio');
        }
        if (a.telefono && (a.telefono.length !== 9 || !/^\d+$/.test(a.telefono))) {
            this.addressErrors.push('El telefono debe tener 9 digitos');
        }
        if (a.codigo_postal && !/^\d{5}$/.test(a.codigo_postal)) {
            this.addressErrors.push('El codigo postal debe tener 5 digitos');
        }

        return this.addressErrors.length === 0;
    }

    saveNewAddress(): void {
        if (!this.validateAddress()) {
            return;
        }
        this.addressService.create(this.newAddress).subscribe({
            next: (res) => {
                this.toast.success('Direccion agregada exitosamente');
                this.closeAddressModal();
                this.loadAddresses();
                if (res.data && res.data.id) {
                    this.checkoutData.direccion_id = String(res.data.id);
                }
            },
            error: () => this.toast.error('Error al agregar direccion')
        });
    }

    getFullAddress(addr: Direccion): string {
        let parts = [addr.direccion_linea1];
        if (addr.direccion_linea2) parts.push(addr.direccion_linea2);
        parts.push(addr.distrito, addr.provincia, addr.departamento);
        return parts.join(', ');
    }

    toString(value: any): string {
        return String(value);
    }

    placeOrder(): void {
        if (!this.checkoutData.direccion_id) {
            this.toast.warning('Selecciona una direccion de envio');
            return;
        }
        if (this.cartItems.length === 0) {
            this.toast.warning('Tu carrito esta vacio');
            return;
        }
        this.loading = true;
        const orderData = {
            direccion_id: Number(this.checkoutData.direccion_id),
            metodo_pago: this.checkoutData.metodo_pago,
            cupon_codigo: this.cuponAplicado ? this.cuponCodigo : undefined,
            notas: this.checkoutData.notas
        };
        this.orderService.createOrder(orderData).subscribe({
            next: (res) => {
                this.loading = false;
                const numero = res.data?.numero_pedido || 'N/A';
                const total = res.data?.total || this.getTotal();
                this.toast.success(`Pedido ${numero} creado - Total: S/ ${total.toFixed(2)}`);
                this.router.navigate(['/mis-pedidos', numero]);
            },
            error: (err) => {
                this.loading = false;
                const msg = err.error?.message || 'Error al crear el pedido. Intenta nuevamente.';
                this.toast.error(msg);
            }
        });
    }
}
