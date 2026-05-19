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
}
