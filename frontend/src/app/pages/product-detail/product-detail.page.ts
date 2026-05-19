import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Producto } from '../../models/producto.model';
import { getProductImageUrl, getCategoryFallbackUrl } from '../../utils/product-image.util';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.css']
})
export class ProductDetailPage implements OnInit {
    product: Producto | null = null;
    related: Producto[] = [];
    reviews: any[] = [];
    loading = true;
    quantity = 1;
    mainImageUrl = '';
    private imageFallbackStep = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private cartService: CartService,
        public auth: AuthService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.loadProduct(params['slug']);
        });
    }

    loadProduct(slug: string): void {
        this.loading = true;
        this.productService.getBySlug(slug).subscribe({
            next: (res) => {
                this.product = res.data;
                this.mainImageUrl = getProductImageUrl(res.data);
                this.imageFallbackStep = 0;
                this.related = res.related;
                this.reviews = res.reviews;
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    addToCart(): void {
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/login']);
            return;
        }
        if (this.product) {
            this.cartService.addToCart(this.product.id, this.quantity).subscribe({
                next: () => {},
                error: (err) => console.error(err)
            });
        }
    }

    onMainImageError(): void {
        if (!this.product) return;
        if (this.imageFallbackStep === 0) {
            this.imageFallbackStep = 1;
            this.mainImageUrl = getCategoryFallbackUrl(this.product.categoria_slug);
        } else {
            this.mainImageUrl = 'assets/images/placeholder.svg';
        }
    }

    getStars(rating: number): number[] {
        return [1, 2, 3, 4, 5];
    }
}
