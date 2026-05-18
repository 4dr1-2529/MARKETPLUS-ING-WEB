import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-product-card',
    template: `
        <div class="product-card" (click)="goToProduct()">
            <div class="product-image">
                <img [src]="product.imagen_principal || 'assets/images/placeholder.jpg'" [alt]="product.nombre">
                <span class="badge-discount" *ngIf="product.descuento_porcentaje">-{{ product.descuento_porcentaje }}%</span>
                <span class="badge-new" *ngIf="product.nuevo">NUEVO</span>
                <button class="btn-favorite" (click)="toggleFavorite($event)">
                    <span class="material-icons">{{ isFavorite ? 'favorite' : 'favorite_border' }}</span>
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">{{ product.categoria }}</span>
                <h3 class="product-name">{{ product.nombre }}</h3>
                <div class="product-rating" *ngIf="product.promedio_valoracion">
                    <span class="material-icons star" *ngFor="let s of [1,2,3,4,5]">{{ s <= (product.promedio_valoracion || 0) ? 'star' : 'star_border' }}</span>
                    <span>({{ product.total_valoraciones }})</span>
                </div>
                <div class="product-price">
                    <span class="price-current" *ngIf="product.precio_oferta">S/ {{ product.precio_oferta | number:'1.2-2' }}</span>
                    <span class="price-original" *ngIf="product.precio_oferta">S/ {{ product.precio | number:'1.2-2' }}</span>
                    <span class="price-current" *ngIf="!product.precio_oferta">S/ {{ product.precio | number:'1.2-2' }}</span>
                </div>
                <button class="btn-add-cart" (click)="addToCart($event)">
                    <span class="material-icons">shopping_cart</span>
                    Agregar
                </button>
            </div>
        </div>
    `,
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
    @Input() product!: Producto;
    isFavorite = false;

    constructor(
        private router: Router,
        private cartService: CartService,
        private auth: AuthService
    ) {}

    goToProduct(): void {
        this.router.navigate(['/producto', this.product.slug]);
    }

    toggleFavorite(event: Event): void {
        event.stopPropagation();
        this.isFavorite = !this.isFavorite;
    }

    addToCart(event: Event): void {
        event.stopPropagation();
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/login']);
            return;
        }
        this.cartService.addToCart(this.product.id, 1).subscribe({
            next: () => {},
            error: (err) => console.error(err)
        });
    }
}
