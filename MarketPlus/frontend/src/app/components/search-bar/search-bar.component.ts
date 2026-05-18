import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    template: `
        <div class="search-bar">
            <input type="text" [(ngModel)]="query" (keyup.enter)="onSearch()" placeholder="Buscar productos..." class="search-input">
            <button (click)="onSearch()" class="search-btn">
                <span class="material-icons">search</span>
            </button>
        </div>
    `,
    styles: [`
        .search-bar { display: flex; border: 2px solid var(--gray-light); border-radius: var(--radius-sm); overflow: hidden; }
        .search-input { flex: 1; padding: 10px 16px; border: none; font-size: 14px; }
        .search-btn { padding: 10px 16px; background: var(--primary); color: var(--white); }
    `]
})
export class SearchBarComponent {
    @Output() search = new EventEmitter<string>();
    query = '';

    onSearch(): void {
        this.search.emit(this.query);
    }
}
