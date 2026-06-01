import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
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
    processingItemId: number | null = null;

    constructor(
        private cartService: CartService,
        private toast: ToastService,
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (!this.auth.isAuthenticated) {
            this.toast.warning('Inicia sesion para ver tu carrito');
            this.router.navigate(['/login'], { queryParams: { return: '/carrito' } });
            return;
        }
        this.loadCart();
    }

    loadCart(): void {
        this.loading = true;
        this.cartService.getCart().subscribe({
            next: (res) => {
                this.items = res.data.items;
                this.subtotal = res.data.subtotal;
                this.totalItems = res.data.total_items;
                this.loading = false;
                this.cartService.updateCount(this.totalItems);
            },
            error: () => { this.loading = false; this.toast.error('Error al cargar el carrito'); }
        });
    }

    updateQuantity(id: number, cantidad: number): void {
        const item = this.items.find(i => i.id === id);
        if (!item) return;
        if (cantidad < 1) {
            this.toast.warning('La cantidad minima es 1');
            return;
        }
        const stock = Number(item.stock_disponible || 0);
        if (stock > 0 && cantidad > stock) {
            this.toast.warning(`Stock maximo disponible: ${stock}`);
            return;
        }

        this.processingItemId = id;
        this.cartService.updateQuantity(id, cantidad).subscribe({
            next: () => {
                this.processingItemId = null;
                this.loadCart();
            },
            error: (err) => {
                this.processingItemId = null;
                this.toast.error(err.error?.message || 'No se pudo actualizar la cantidad');
            }
        });
    }

    removeItem(id: number): void {
        if (!confirm('¿Deseas eliminar este producto del carrito?')) return;
        this.processingItemId = id;
        this.cartService.removeFromCart(id).subscribe({
            next: () => {
                this.processingItemId = null;
                this.toast.info('Producto eliminado del carrito');
                this.loadCart();
            },
            error: () => {
                this.processingItemId = null;
                this.toast.error('No se pudo eliminar el producto');
            }
        });
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

    canIncrease(item: CarritoItem): boolean {
        const stock = Number(item.stock_disponible || 0);
        if (!stock) return false;
        return item.cantidad < stock;
    }
}
