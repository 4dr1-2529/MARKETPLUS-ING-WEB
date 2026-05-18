import { Component } from '@angular/core';

@Component({
    selector: 'app-loader',
    template: `
        <div class="loader-overlay" *ngIf="isLoading">
            <div class="loader-spinner">
                <div class="spinner"></div>
                <p>Cargando...</p>
            </div>
        </div>
    `,
    styles: [`
        .loader-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(255,255,255,0.9); z-index: 9999;
            display: flex; align-items: center; justify-content: center;
        }
        .loader-spinner { text-align: center; }
        .spinner {
            width: 50px; height: 50px; border: 4px solid var(--gray-light);
            border-top-color: var(--primary); border-radius: 50%;
            animation: spin 0.8s linear infinite; margin: 0 auto 16px;
        }
        .loader-spinner p { color: var(--dark-light); font-weight: 500; }
    `]
})
export class LoaderComponent {
    isLoading = false;
    show(): void { this.isLoading = true; }
    hide(): void { this.isLoading = false; }
}
