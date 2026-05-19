import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-bar',
    template: `
        <div class="search-bar">
            <input type="text" [(ngModel)]="query" (keyup.enter)="onSearch()" placeholder="Buscar por nombre, marca o categoría…" class="search-input" minlength="2">
            <button type="button" (click)="onSearch()" class="search-btn">
                <span class="material-icons">search</span>
            </button>
        </div>
    `,
    styles: [`
        .search-bar {
            display: flex;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-sm);
            overflow: hidden;
            background: var(--bg-input);
            flex: 1;
        }
        .search-input {
            flex: 1;
            padding: 10px 16px;
            border: none;
            font-size: 14px;
            background: transparent;
            color: var(--text-primary);
        }
        .search-input::placeholder { color: var(--text-muted); }
        .search-btn {
            padding: 10px 16px;
            background: var(--primary);
            color: #fff;
        }
    `]
})
export class SearchBarComponent implements OnInit {
    @Output() search = new EventEmitter<string>();
    query = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.query = this.route.snapshot.queryParams['search'] || '';
        this.route.queryParams.subscribe(p => {
            this.query = p['search'] || '';
        });
    }

    onSearch(): void {
        this.search.emit(this.query.trim());
    }
}
