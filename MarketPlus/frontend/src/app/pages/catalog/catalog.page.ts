import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';
import { Producto } from '../../models/producto.model';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.page.html',
    styleUrls: ['./catalog.page.css']
})
export class CatalogPage implements OnInit {
    products: Producto[] = [];
    categories: any[] = [];
    brands: any[] = [];
    loading = true;
    pagination: any = {};
    filters: any = { page: 1, limit: 12 };

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private brandService: BrandService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.filters = { ...this.filters, ...params, page: 1 };
            this.loadProducts();
        });
        this.categoryService.getAll().subscribe(res => this.categories = res.data);
        this.brandService.getAll().subscribe(res => this.brands = res.data);
    }

    loadProducts(): void {
        this.loading = true;
        this.productService.getAll(this.filters).subscribe({
            next: (res) => { this.products = res.data; this.pagination = res.pagination; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    onFilterChange(filters: any): void {
        this.filters = { ...this.filters, ...filters, page: 1 };
        this.loadProducts();
    }

    onSearch(query: string): void {
        this.filters = { ...this.filters, search: query, page: 1 };
        this.loadProducts();
    }

    changePage(page: number): void {
        this.filters.page = page;
        this.loadProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
