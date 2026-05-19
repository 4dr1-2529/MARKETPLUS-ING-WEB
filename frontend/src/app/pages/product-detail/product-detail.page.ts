import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';
import { Producto } from '../../models/producto.model';
import { getProductImageUrl, getCategoryFallbackUrl } from '../../utils/product-image.util';
import { fadeInAnimation } from '../../shared/animations';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.css'],
    animations: [fadeInAnimation]
})
export class ProductDetailPage implements OnInit {
    Math = Math;
    product: Producto | null = null;
    related: Producto[] = [];
    reviews: any[] = [];
    loading = true;
    quantity = 1;
    mainImageUrl = '';
    private imageFallbackStep = 0;

    showReviewForm = false;
    userReview: any = null;
    reviewRating = 0;
    reviewHoverRating = 0;
    reviewComment = '';
    reviewSubmitting = false;
    reviewSubmitted = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private cartService: CartService,
        public auth: AuthService,
        private reviewService: ReviewService
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
                this.reviews = res.reviews || [];
                this.loading = false;

                if (this.auth.isAuthenticated && this.product) {
                    this.loadUserReview(this.product.id);
                }
            },
            error: () => { this.loading = false; }
        });
    }

    loadUserReview(productId: number): void {
        this.reviewService.getUserReview(productId).subscribe({
            next: (res) => {
                if (res.data) {
                    this.userReview = res.data;
                }
            },
            error: () => {}
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

    getAverageRating(): number {
        if (this.reviews.length === 0) return 0;
        const sum = this.reviews.reduce((acc, r) => acc + r.calificacion, 0);
        return Math.round((sum / this.reviews.length) * 10) / 10;
    }

    getRatingDistribution(): { stars: number; count: number; percent: number }[] {
        const dist = [5, 4, 3, 2, 1].map(star => {
            const count = this.reviews.filter(r => r.calificacion === star).length;
            return { stars: star, count, percent: this.reviews.length > 0 ? (count / this.reviews.length) * 100 : 0 };
        });
        return dist;
    }

    openReviewForm(): void {
        if (!this.auth.isAuthenticated) {
            this.router.navigate(['/login']);
            return;
        }
        this.showReviewForm = true;
    }

    closeReviewForm(): void {
        this.showReviewForm = false;
        this.resetReviewForm();
    }

    submitReview(): void {
        if (this.reviewRating === 0) return;
        if (!this.reviewComment.trim() || !this.product) return;

        this.reviewSubmitting = true;
        this.reviewService.create({
            producto_id: this.product.id,
            calificacion: this.reviewRating,
            comentario: this.reviewComment.trim()
        }).subscribe({
            next: (res) => {
                this.reviewSubmitting = false;
                this.reviewSubmitted = true;
                this.reviews.unshift(res.data);
                if (this.product) {
                    this.product.total_valoraciones = (this.product.total_valoraciones || 0) + 1;
                }
            },
            error: () => {
                this.reviewSubmitting = false;
            }
        });
    }

    resetReviewForm(): void {
        this.reviewRating = 0;
        this.reviewHoverRating = 0;
        this.reviewComment = '';
        this.reviewSubmitted = false;
    }

    getReviewText(rating: number): string {
        const texts = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
        return texts[rating] || '';
    }
}
