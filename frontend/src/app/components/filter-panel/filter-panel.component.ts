import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getCategoryLabel } from '../../utils/category-label.util';

const priceRanges = [
    { label: 'Todos los precios', value: '' },
    { label: 'Hasta S/ 200', value: '0-200' },
    { label: 'S/ 200 - S/ 500', value: '200-500' },
    { label: 'S/ 500 - S/ 1,000', value: '500-1000' },
    { label: 'S/ 1,000 - S/ 2,000', value: '1000-2000' },
    { label: 'S/ 2,000 - S/ 5,000', value: '2000-5000' },
    { label: 'S/ 5,000 - S/ 10,000', value: '5000-10000' },
    { label: 'Mas de S/ 10,000', value: '10000-999999' }
];

@Component({
    selector: 'app-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit, OnDestroy {
    @Output() filterChange = new EventEmitter<void>();
    @Input() categories: any[] = [];
    @Input() brands: any[] = [];

    selectedCategories: string[] = [];
    selectedBrands: string[] = [];
    selectedPriceRange = '';
    sort = 'newest';
    showMobileFilters = false;

    readonly priceRanges = priceRanges;

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
        const catParam = q['categorias'] || q['categoria'] || '';
        this.selectedCategories = catParam ? catParam.split(',').filter(Boolean) : [];
        const brandParam = q['marcas'] || q['marca'] || '';
        this.selectedBrands = brandParam ? brandParam.split(',').filter(Boolean) : [];
        this.selectedPriceRange = q['precio'] || '';
        this.sort = q['sort'] || 'newest';
    }

    get activeFilterCount(): number {
        let count = 0;
        if (this.selectedCategories.length > 0) count++;
        if (this.selectedBrands.length > 0) count++;
        if (this.selectedPriceRange) count++;
        if (this.sort !== 'newest') count++;
        return count;
    }

    get activeFilters(): { label: string, clear: () => void }[] {
        const filters: { label: string, clear: () => void }[] = [];
        
        if (this.selectedCategories.length > 0) {
            const labels = this.selectedCategories.map(slug => {
                const cat = this.categories.find(c => c.slug === slug);
                return cat ? this.getCategoryLabel(cat.slug, cat.nombre) : slug;
            });
            filters.push({ label: `Categorias: ${labels.join(', ')}`, clear: () => { this.selectedCategories = []; this.applyFilters(); } });
        }
        
        if (this.selectedBrands.length > 0) {
            const labels = this.selectedBrands.map(slug => {
                const brand = this.brands.find(b => b.slug === slug);
                return brand?.nombre || slug;
            });
            filters.push({ label: `Marcas: ${labels.join(', ')}`, clear: () => { this.selectedBrands = []; this.applyFilters(); } });
        }
        
        if (this.selectedPriceRange) {
            const range = this.priceRanges.find(r => r.value === this.selectedPriceRange);
            filters.push({ label: `Precio: ${range?.label}`, clear: () => { this.selectedPriceRange = ''; this.applyFilters(); } });
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
        if (this.selectedCategories.length > 0) queryParams['categorias'] = this.selectedCategories.join(',');
        if (this.selectedBrands.length > 0) queryParams['marcas'] = this.selectedBrands.join(',');
        if (this.selectedPriceRange) {
            const [min, max] = this.selectedPriceRange.split('-');
            queryParams['minPrice'] = min;
            queryParams['maxPrice'] = max;
        }
        if (this.sort && this.sort !== 'newest') queryParams['sort'] = this.sort;

        this.router.navigate(['/catalogo'], { queryParams });
        this.filterChange.emit();
    }

    toggleCategory(slug: string): void {
        const idx = this.selectedCategories.indexOf(slug);
        if (idx >= 0) {
            this.selectedCategories.splice(idx, 1);
        } else {
            this.selectedCategories.push(slug);
        }
        this.applyFilters();
    }

    toggleBrand(slug: string): void {
        const idx = this.selectedBrands.indexOf(slug);
        if (idx >= 0) {
            this.selectedBrands.splice(idx, 1);
        } else {
            this.selectedBrands.push(slug);
        }
        this.applyFilters();
    }

    isCategorySelected(slug: string): boolean {
        return this.selectedCategories.includes(slug);
    }

    isBrandSelected(slug: string): boolean {
        return this.selectedBrands.includes(slug);
    }

    clearFilters(): void {
        this.selectedCategories = [];
        this.selectedBrands = [];
        this.selectedPriceRange = '';
        this.sort = 'newest';
        this.router.navigate(['/catalogo'], { queryParams: { sort: 'newest', page: 1 } });
        this.filterChange.emit();
    }

    toggleMobileFilters(): void {
        this.showMobileFilters = !this.showMobileFilters;
    }
}
