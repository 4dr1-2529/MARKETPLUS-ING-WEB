import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.css']
})
export class CheckoutPage implements OnInit {
    cartItems: any[] = [];
    subtotal = 0;
    loading = false;

    checkoutData = {
        direccion_id: '',
        metodo_pago: 'tarjeta_credito',
        cupon_codigo: '',
        notas: ''
    };

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cartService.getCart().subscribe({
            next: (res) => { this.cartItems = res.data.items; this.subtotal = res.data.subtotal; },
            error: () => this.router.navigate(['/carrito'])
        });
    }

    getIgv(): number { return this.subtotal * 0.18; }
    getShipping(): number { return this.subtotal > 500 ? 0 : 15; }
    getTotal(): number { return this.subtotal + this.getIgv() + this.getShipping(); }

    placeOrder(): void {
        if (!this.checkoutData.direccion_id) return;
        this.loading = true;
        this.orderService.createOrder(this.checkoutData).subscribe({
            next: (res) => {
                this.loading = false;
                this.router.navigate(['/mis-pedidos']);
            },
            error: () => { this.loading = false; }
        });
    }
}
