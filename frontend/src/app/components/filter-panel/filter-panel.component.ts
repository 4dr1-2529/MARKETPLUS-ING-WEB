import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';

@Component({
    selector: 'app-filter-panel',
    template: `
        <div class="filter-panel">
            <h3><span class="material-icons">filter_list</span> Filtros</h3>
            <div class="filter-group">
                <label>Categoria</label>
                <select [(ngModel)]="selectedCategory" (change)="applyFilters()">
                    <option value="">Todas</option>
                    <option *ngFor="let c of categories" [value]="c.slug">{{ c.nombre }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Marca</label>
                <select [(ngModel)]="selectedBrand" (change)="applyFilters()">
                    <option value="">Todas</option>
                    <option *ngFor="let b of brands" [value]="b.slug">{{ b.nombre }}</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Precio</label>
                <div class="price-range">
                    <input type="number" [(ngModel)]="minPrice" placeholder="Min" (change)="applyFilters()">
                    <span>-</span>
                    <input type="number" [(ngModel)]="maxPrice" placeholder="Max" (change)="applyFilters()">
                </div>
            </div>
            <div class="filter-group">
                <label>Ordenar</label>
                <select [(ngModel)]="sort" (change)="applyFilters()">
                    <option value="newest">Mas recientes</option>
                    <option value="price_asc">Precio: Menor a Mayor</option>
                    <option value="price_desc">Precio: Mayor a Menor</option>
                    <option value="name_asc">Nombre: A-Z</option>
                    <option value="popular">Mas vendidos</option>
                </select>
            </div>
            <button class="btn-clear" (click)="clearFilters()">Limpiar Filtros</button>
        </div>
    `,
    styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {
    @Output() filterChange = new EventEmitter<any>();
    @Input() categories: any[] = [];
    @Input() brands: any[] = [];

    selectedCategory = '';
    selectedBrand = '';
    minPrice: number | null = null;
    maxPrice: number | null = null;
    sort = 'newest';

    constructor(private categoryService: CategoryService, private brandService: BrandService) {}

    ngOnInit(): void {
        this.categoryService.getAll().subscribe(res => this.categories = res.data);
        this.brandService.getAll().subscribe(res => this.brands = res.data);
    }

    applyFilters(): void {
        this.filterChange.emit({
            categoria: this.selectedCategory || null,
            marca: this.selectedBrand || null,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
            sort: this.sort
        });
    }

    clearFilters(): void {
        this.selectedCategory = '';
        this.selectedBrand = '';
        this.minPrice = null;
        this.maxPrice = null;
        this.sort = 'newest';
        this.applyFilters();
    }
}
