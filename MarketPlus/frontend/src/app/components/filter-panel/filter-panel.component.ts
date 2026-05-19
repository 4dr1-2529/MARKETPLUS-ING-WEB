import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCategoryLabel } from '../../utils/category-label.util';

@Component({
    selector: 'app-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit, OnDestroy {
    @Output() filterChange = new EventEmitter<void>();
    @Input() categories: any[] = [];
    @Input() brands: any[] = [];

    selectedCategory = '';
    selectedBrand = '';
    minPrice: number | null = null;
    maxPrice: number | null = null;
    sort = 'newest';
    showMobileFilters = false;

    private sub?: Subscription;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.syncFromUrl(this.route.snapshot.queryParams);
        this.sub = this.route.queryParams.subscribe(params => this.syncFromUrl(params));
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    getCategoryLabel = getCategoryLabel;

    private syncFromUrl(q: Record<string, string>): void {
        this.selectedCategory = q['categoria'] || '';
        this.selectedBrand = q['marca'] || '';
        this.minPrice = q['minPrice'] ? +q['minPrice'] : null;
        this.maxPrice = q['maxPrice'] ? +q['maxPrice'] : null;
        this.sort = q['sort'] || 'newest';
    }

    get activeFilterCount(): number {
        let count = 0;
        if (this.selectedCategory) count++;
        if (this.selectedBrand) count++;
        if (this.minPrice || this.maxPrice) count++;
        if (this.sort !== 'newest') count++;
        return count;
    }

    get activeFilters(): { label: string, clear: () => void }[] {
        const filters: { label: string, clear: () => void }[] = [];
        
        if (this.selectedCategory) {
            const cat = this.categories.find(c => c.slug === this.selectedCategory);
            const label = cat ? this.getCategoryLabel(cat.slug, cat.nombre) : this.selectedCategory;
            filters.push({ label: `Categoría: ${label}`, clear: () => { this.selectedCategory = ''; this.applyFilters(); } });
        }
        
        if (this.selectedBrand) {
            const brand = this.brands.find(b => b.slug === this.selectedBrand);
            filters.push({ label: `Marca: ${brand?.nombre || this.selectedBrand}`, clear: () => { this.selectedBrand = ''; this.applyFilters(); } });
        }
        
        if (this.minPrice || this.maxPrice) {
            const min = this.minPrice ? `S/ ${this.minPrice}` : 'S/ 0';
            const max = this.maxPrice ? `S/ ${this.maxPrice}` : '∞';
            filters.push({ label: `Precio: ${min} - ${max}`, clear: () => { this.minPrice = null; this.maxPrice = null; this.applyFilters(); } });
        }
        
        if (this.sort !== 'newest') {
            const sortLabels: Record<string, string> = {
                'popular': 'Más vendidos',
                'price_asc': 'Precio: menor a mayor',
                'price_desc': 'Precio: mayor a menor',
                'name_asc': 'Nombre: A → Z'
            };
            filters.push({ label: `Orden: ${sortLabels[this.sort] || this.sort}`, clear: () => { this.sort = 'newest'; this.applyFilters(); } });
        }
        
        return filters;
    }

    applyFilters(): void {
        const queryParams: Record<string, string | number> = { page: 1 };
        if (this.selectedCategory) queryParams['categoria'] = this.selectedCategory;
        if (this.selectedBrand) queryParams['marca'] = this.selectedBrand;
        if (this.minPrice) queryParams['minPrice'] = this.minPrice;
        if (this.maxPrice) queryParams['maxPrice'] = this.maxPrice;
        if (this.sort && this.sort !== 'newest') queryParams['sort'] = this.sort;

        this.router.navigate(['/catalogo'], { queryParams });
        this.filterChange.emit();
    }

    selectCategory(slug: string): void {
        this.selectedCategory = slug;
        if (slug !== this.route.snapshot.queryParams['categoria']) {
            this.selectedBrand = '';
        }
        this.applyFilters();
    }

    clearFilters(): void {
        this.selectedCategory = '';
        this.selectedBrand = '';
        this.minPrice = null;
        this.maxPrice = null;
        this.sort = 'newest';
        this.router.navigate(['/catalogo'], { queryParams: { sort: 'newest', page: 1 } });
        this.filterChange.emit();
    }

    toggleMobileFilters(): void {
        this.showMobileFilters = !this.showMobileFilters;
    }
}
