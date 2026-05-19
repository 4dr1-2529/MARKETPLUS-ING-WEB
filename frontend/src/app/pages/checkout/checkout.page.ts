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
        departamento: '',
        provincia: '',
        distrito: '',
        telefono: '',
        es_principal: false
    };

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
            telefono: '',
            es_principal: false
        };
        this.showAddressModal = true;
    }

    closeAddressModal(): void {
        this.showAddressModal = false;
    }

    saveNewAddress(): void {
        if (!this.newAddress.destinatario || !this.newAddress.direccion_linea1 || !this.newAddress.departamento || !this.newAddress.provincia || !this.newAddress.distrito) {
            this.toast.warning('Completa todos los campos obligatorios');
            return;
        }
        this.addressService.create(this.newAddress).subscribe({
            next: (res) => {
                this.toast.success('Direccion agregada');
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

    placeOrder(): void {
        if (!this.checkoutData.direccion_id) {
            this.toast.warning('Selecciona una direccion de envio');
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
            next: () => {
                this.loading = false;
                this.toast.success('Pedido creado exitosamente');
                this.router.navigate(['/mis-pedidos']);
            },
            error: () => {
                this.loading = false;
                this.toast.error('Error al crear el pedido');
            }
        });
    }
}
