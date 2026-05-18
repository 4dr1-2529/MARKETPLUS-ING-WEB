import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Producto, Categoria } from '../../models/producto.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {
    featuredProducts: Producto[] = [];
    categories: Categoria[] = [];
    loading = true;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.loadFeatured();
        this.loadCategories();
    }

    loadFeatured(): void {
        this.productService.getFeatured().subscribe({
            next: (res) => { this.featuredProducts = res.data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    loadCategories(): void {
        this.categoryService.getAll().subscribe(res => { this.categories = res.data; });
    }

    getCategoryIcon(slug: string): string {
        const icons: any = {
            'celulares-smartphones': 'smartphone',
            'laptops-computadoras': 'laptop',
            'tablets': 'tablet',
            'audifonos-audio': 'headphones',
            'smartwatch-wearables': 'watch',
            'accesorios': 'cable',
            'gaming': 'sports_esports',
            'televisores': 'tv'
        };
        return icons[slug] || 'devices';
    }
}
