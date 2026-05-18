import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CarritoItem } from '../../models/index.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.css']
})
export class CartPage implements OnInit {
    items: CarritoItem[] = [];
    subtotal = 0;
    totalItems = 0;
    loading = true;

    constructor(private cartService: CartService) {}

    ngOnInit(): void { this.loadCart(); }

    loadCart(): void {
        this.cartService.getCart().subscribe({
            next: (res) => { this.items = res.data.items; this.subtotal = res.data.subtotal; this.totalItems = res.data.total_items; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    updateQuantity(id: number, cantidad: number): void {
        if (cantidad < 1) return;
        this.cartService.updateQuantity(id, cantidad).subscribe(() => this.loadCart());
    }

    removeItem(id: number): void {
        this.cartService.removeFromCart(id).subscribe(() => this.loadCart());
    }

    getUnitPrice(item: CarritoItem): number {
        return item.precio_oferta || item.precio;
    }

    getItemTotal(item: CarritoItem): number {
        return this.getUnitPrice(item) * item.cantidad;
    }

    getIgv(): number {
        return this.subtotal * 0.18;
    }

    getShipping(): number {
        return this.subtotal > 500 ? 0 : 15;
    }

    getTotal(): number {
        return this.subtotal + this.getIgv() + this.getShipping();
    }
}
