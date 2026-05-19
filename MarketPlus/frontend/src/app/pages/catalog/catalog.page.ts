import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';
import { Producto } from '../../models/producto.model';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from '../../services/auth.service';
import { getCategoryLabel } from '../../utils/category-label.util';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.page.html',
    styleUrls: ['./catalog.page.css']
})
export class CatalogPage implements OnInit, OnDestroy {
    products: Producto[] = [];
    categories: any[] = [];
    brands: any[] = [];
    loading = true;
    pagination: any = {};
    filters: Record<string, string | number> = { page: 1, limit: 12, sort: 'newest' };
    favoriteIds: number[] = [];
    filtersOpen = false;
    activeFilterCount = 0;
    activeCategoryLabel = '';
    activeBrandLabel = '';
    activeSearchQuery = '';
    activePriceLabel = '';

    private routeSub?: Subscription;

    getCategoryLabel = getCategoryLabel;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private brandService: BrandService,
        private route: ActivatedRoute,
        private router: Router,
        private favoriteService: FavoriteService,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.categoryService.getAll(true).subscribe({
            next: (res) => { this.categories = res.data || []; },
            error: (err) => console.error('Error loading categories:', err)
        });
        this.routeSub = this.route.queryParams.subscribe(params => {
            this.filters = this.buildFilters(params);
            this.activeCategoryLabel = params['categoria']
                ? getCategoryLabel(params['categoria'])
                : '';
            this.activeSearchQuery = params['search']?.trim() || '';
            this.activePriceLabel = this.buildPriceLabel(params);
            this.updateActiveFilterCount(params);
            this.loadBrands(params['categoria']);
            this.loadProducts(params);
        });
        if (this.auth.isAuthenticated) {
            this.favoriteService.getFavorites().subscribe({
                next: (res) => { this.favoriteIds = res.data.map((f: any) => f.producto_id); },
                error: (err) => console.error('Error loading favorites:', err)
            });
        }
    }

    ngOnDestroy(): void {
        this.routeSub?.unsubscribe();
    }

    private buildFilters(params: Record<string, string>): Record<string, string | number> {
        const f: Record<string, string | number> = { page: params['page'] ? +params['page'] : 1, limit: 12 };
        const catParam = params['categorias'] || params['categoria'] || '';
        if (catParam) f['categorias'] = catParam;
        const brandParam = params['marcas'] || params['marca'] || '';
        if (brandParam) f['marcas'] = brandParam;
        if (params['search']) f['search'] = params['search'];
        if (params['minPrice']) f['minPrice'] = params['minPrice'];
        if (params['maxPrice']) f['maxPrice'] = params['maxPrice'];
        if (params['sort']) f['sort'] = params['sort'];
        return f;
    }

    loadBrands(categoriaSlug?: string): void {
        if (!categoriaSlug) {
            this.brandService.getAll().subscribe(res => {
                this.brands = res.data;
                const marcaSlugs = this.filters['marcas'] as string | undefined;
                if (marcaSlugs) {
                    const selected = marcaSlugs.split(',').filter(Boolean);
                    const found = selected.map(s => this.brands.find(b => b.slug === s)).filter(Boolean);
                    this.activeBrandLabel = found.map(b => (b as any).nombre).join(', ');
                } else {
                    this.activeBrandLabel = '';
                }
            });
        } else {
            this.brandService.getAll(categoriaSlug).subscribe(res => {
                this.brands = res.data;
                const marcaSlugs = this.filters['marcas'] as string | undefined;
                if (marcaSlugs) {
                    const selected = marcaSlugs.split(',').filter(Boolean);
                    const found = selected.map(s => this.brands.find(b => b.slug === s)).filter(Boolean);
                    this.activeBrandLabel = found.map(b => (b as any).nombre).join(', ');
                } else {
                    this.activeBrandLabel = '';
                }
            });
        }
    }

    private buildPriceLabel(params: Record<string, string>): string {
        const min = params['minPrice'];
        const max = params['maxPrice'];
        if (min && max) return `S/ ${min} – ${max}`;
        if (min) return `Desde S/ ${min}`;
        if (max) return `Hasta S/ ${max}`;
        return '';
    }

    loadProducts(params?: Record<string, string>): void {
        this.loading = true;
        const hasFilters = params && (
            params['categorias'] || params['categoria'] ||
            params['marcas'] || params['marca'] ||
            params['search'] || params['minPrice'] || params['maxPrice'] ||
            params['destacados']
        );

        if (!hasFilters) {
            console.log('[Catalog] No filters, loading featured products');
            this.productService.getFeatured().subscribe({
                next: (res) => {
                    console.log('[Catalog] Featured products response:', res);
                    this.products = res.data || [];
                    this.pagination = { total: this.products.length, page: 1, limit: this.products.length, pages: 1 };
                    this.loading = false;
                    console.log('[Catalog] Featured products loaded:', this.products.length);
                },
                error: (err) => {
                    console.error('[Catalog] Error loading featured products:', err);
                    this.products = [];
                    this.pagination = {};
                    this.loading = false;
                }
            });
        } else {
            console.log('[Catalog] Loading products with filters:', this.filters);
            this.productService.getAll(this.filters).subscribe({
                next: (res) => {
                    console.log('[Catalog] Products response:', res);
                    this.products = res.data || [];
                    this.pagination = res.pagination || {};
                    this.loading = false;
                    console.log('[Catalog] Products loaded:', this.products.length, 'Total:', this.pagination.total);
                },
                error: (err) => {
                    console.error('[Catalog] Error loading products:', err);
                    this.products = [];
                    this.pagination = {};
                    this.loading = false;
                }
            });
        }
    }

    onFilterApplied(): void {
        this.closeFilters();
    }

    onSearch(query: string): void {
        const q = query?.trim() || '';
        const params: Record<string, string> = { ...this.route.snapshot.queryParams, page: '1' };
        if (q.length >= 2) {
            params['search'] = q;
        } else {
            delete params['search'];
        }
        this.router.navigate(['/catalogo'], { queryParams: params });
    }

    changePage(page: number): void {
        this.router.navigate(['/catalogo'], {
            queryParams: { ...this.route.snapshot.queryParams, page }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    removeFilter(key: string): void {
        const params: Record<string, string> = { ...this.route.snapshot.queryParams, page: '1' };
        delete params[key];
        this.router.navigate(['/catalogo'], { queryParams: params });
    }

    openFilters(): void { this.filtersOpen = true; }
    closeFilters(): void { this.filtersOpen = false; }

    clearAllFilters(): void {
        this.router.navigate(['/catalogo'], { queryParams: { sort: 'newest', page: 1 } });
    }

    removePriceFilters(): void {
        const params: Record<string, string> = { ...this.route.snapshot.queryParams, page: '1' };
        delete params['minPrice'];
        delete params['maxPrice'];
        this.router.navigate(['/catalogo'], { queryParams: params });
    }

    private updateActiveFilterCount(params: Record<string, string>): void {
        let n = 0;
        if (params['categoria']) n++;
        if (params['marca']) n++;
        if (params['minPrice'] || params['maxPrice']) n++;
        if (params['search']) n++;
        this.activeFilterCount = n;
    }
}
