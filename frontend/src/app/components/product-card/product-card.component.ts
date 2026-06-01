import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
import { ToastService } from '../../services/toast.service';
import { getCategoryLabel } from '../../utils/category-label.util';
import { getProductImageUrl, getCategoryFallbackUrl } from '../../utils/product-image.util';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
    @Input() product!: Producto;
    @Input() favoriteIds: number[] = [];
    isFavorite = false;
    imageUrl = '';
    private imageFallbackStep = 0;

    constructor(
        private router: Router,
        private cartService: CartService,
        private auth: AuthService,
        private favoriteService: FavoriteService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.isFavorite = this.favoriteIds.includes(this.product.id);
        this.imageUrl = getProductImageUrl(this.product);
    }

    onImageError(): void {
        if (this.imageFallbackStep === 0) {
            this.imageFallbackStep = 1;
            this.imageUrl = getCategoryFallbackUrl(this.product.categoria_slug);
        }
    }

    get categoryLabel(): string {
        return getCategoryLabel(this.product.categoria_slug || '', this.product.categoria);
    }

    get categoryLabelUpper(): string {
        return this.categoryLabel.toUpperCase();
    }

    get shortDescription(): string {
        const text = (this.product.descripcion || '').trim();
        if (!text) return '';
        return text.length > 95 ? text.slice(0, 92) + '…' : text;
    }

    get displayPrice(): number {
        return this.product.precio_oferta ?? this.product.precio;
    }

    goToProduct(): void {
        this.router.navigate(['/producto', this.product.slug]);
    }

    toggleFavorite(event: Event): void {
        event.stopPropagation();
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/login']);
            return;
        }
        if (this.isFavorite) {
            this.favoriteService.removeFavorite(this.product.id).subscribe({
                next: () => {
                    this.isFavorite = false;
                    this.favoriteService.updateCount(this.favoriteService.getCount() - 1);
                    this.toast.success('Eliminado de favoritos');
                },
                error: () => this.toast.error('No se pudo eliminar')
            });
        } else {
            this.favoriteService.addFavorite(this.product.id).subscribe({
                next: () => {
                    this.isFavorite = true;
                    this.favoriteService.updateCount(this.favoriteService.getCount() + 1);
                    this.toast.success('Agregado a favoritos');
                },
                error: (err) => this.toast.error(err.error?.message || 'Error al agregar')
            });
        }
    }

    addToCart(event: Event): void {
        event.stopPropagation();
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/login']);
            return;
        }
        this.cartService.addToCart(this.product.id, 1).subscribe({
            next: (res) => {
                this.cartService.updateCount(this.cartService.getCount() + 1);
                if (res.message === 'Cantidad actualizada en el carrito') {
                    this.toast.success('Cantidad actualizada en el carrito');
                } else {
                    this.toast.success('Producto agregado al carrito');
                }
            },
            error: (err) => this.toast.error(err.error?.message || 'No se pudo agregar el producto')
        });
    }
}
