import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/index.model';
import { getCategoryLabel } from '../../utils/category-label.util';

const FALLBACK_CATEGORIES: Categoria[] = [
    { id: 1, nombre: 'Celulares', slug: 'celulares', estado: 'activo', total_productos: 15 },
    { id: 2, nombre: 'Laptops', slug: 'laptops', estado: 'activo', total_productos: 15 },
    { id: 3, nombre: 'Tablets', slug: 'tablets', estado: 'activo', total_productos: 15 },
    { id: 4, nombre: 'Audífonos y Headsets', slug: 'audifonos-headsets', estado: 'activo', total_productos: 15 },
    { id: 5, nombre: 'Smart TV', slug: 'smart-tv', estado: 'activo', total_productos: 15 }
];

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {
    featuredProducts: Producto[] = [];
    categories: Categoria[] = [];
    mainCategories: Categoria[] = [];
    loading = true;
    countdownHours = '08';
    countdownMinutes = '45';
    countdownSeconds = '30';
    private countdownInterval?: any;

    getCategoryLabel = getCategoryLabel;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.loadFeatured();
        this.loadCategories();
        this.initScrollAnimations();
        this.startCountdown();
    }

    ngOnDestroy(): void {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }

    startCountdown(): void {
        let totalSeconds = 8 * 3600 + 45 * 60 + 30;

        this.countdownInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                totalSeconds = 24 * 3600;
            }
            totalSeconds--;

            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            this.countdownHours = h.toString().padStart(2, '0');
            this.countdownMinutes = m.toString().padStart(2, '0');
            this.countdownSeconds = s.toString().padStart(2, '0');
        }, 1000);
    }

    initScrollAnimations(): void {
        setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                },
                { threshold: 0.1 }
            );
            document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
        }, 100);
    }

    loadFeatured(): void {
        this.productService.getFeatured().subscribe({
            next: (res) => { this.featuredProducts = res.data || []; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    loadCategories(): void {
        this.categoryService.getAll(true).subscribe({
            next: (res) => this.setCategories(res.data?.length ? res.data : FALLBACK_CATEGORIES),
            error: () => this.setCategories(FALLBACK_CATEGORIES)
        });
    }

    private setCategories(list: Categoria[]): void {
        this.categories = list;
        const priority = [
            'celulares', 'laptops', 'tablets', 'audifonos-headsets',
            'smart-tv', 'consolas-videojuegos', 'monitores', 'accesorios-gamer'
        ];
        this.mainCategories = [...list]
            .sort((a, b) => {
                const ia = priority.indexOf(a.slug);
                const ib = priority.indexOf(b.slug);
                return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
            })
            .slice(0, 5);
    }

    getCategoryIcon(slug: string): string {
        const icons: Record<string, string> = {
            'celulares': 'smartphone', 'celulares-smartphones': 'smartphone',
            'laptops': 'laptop', 'laptops-computadoras': 'laptop',
            'computadoras-escritorio': 'computer',
            'tablets': 'tablet',
            'smartwatches': 'watch', 'smartwatch-wearables': 'watch',
            'audifonos-headsets': 'headphones', 'auriculares-audio': 'headphones',
            'accesorios-gamer': 'sports_esports',
            'monitores': 'monitor',
            'teclados-mouse': 'keyboard',
            'impresoras': 'print',
            'camaras-fotografia': 'photo_camera',
            'parlantes-audio': 'speaker',
            'componentes-pc': 'memory',
            'almacenamiento': 'sd_storage',
            'redes-wifi': 'router',
            'consolas-videojuegos': 'videogame_asset',
            'smart-tv': 'tv',
            'hogar-inteligente': 'home',
            'cargadores-powerbanks': 'battery_charging_full',
            'accesorios-celulares': 'phonelink_setup',
            'refrigeradoras': 'kitchen'
        };
        return icons[slug] || 'devices';
    }
}
