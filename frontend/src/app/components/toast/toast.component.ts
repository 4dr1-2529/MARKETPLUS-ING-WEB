import { Component } from '@angular/core';

@Component({
    selector: 'app-toast',
    template: `
        <div class="toast-container">
            <div *ngFor="let toast of toasts" class="toast toast-{{ toast.type }}" [class.show]="toast.show">
                <span class="material-icons">{{ getIcon(toast.type) }}</span>
                <p>{{ toast.message }}</p>
                <button (click)="removeToast(toast.id)" class="toast-close">
                    <span class="material-icons">close</span>
                </button>
            </div>
        </div>
    `,
    styles: [`
        .toast-container { position: fixed; top: 80px; right: 20px; z-index: 10000; display: flex; flex-direction: column; gap: 12px; }
        .toast {
            display: flex; align-items: center; gap: 12px; padding: 14px 20px;
            background: var(--white); border-radius: var(--radius-sm);
            box-shadow: var(--shadow-lg); min-width: 300px; max-width: 400px;
            transform: translateX(120%); transition: transform 0.4s ease;
        }
        .toast.show { transform: translateX(0); }
        .toast .material-icons { font-size: 24px; }
        .toast p { flex: 1; font-size: 14px; font-weight: 500; }
        .toast-close { background: none; padding: 4px; color: var(--gray); }
        .toast-success { border-left: 4px solid var(--success); }
        .toast-success .material-icons { color: var(--success); }
        .toast-error { border-left: 4px solid var(--danger); }
        .toast-error .material-icons { color: var(--danger); }
        .toast-warning { border-left: 4px solid var(--warning); }
        .toast-warning .material-icons { color: var(--warning); }
        .toast-info { border-left: 4px solid var(--primary); }
        .toast-info .material-icons { color: var(--primary); }
    `]
})
export class ToastComponent {
    toasts: Array<{ id: number; type: string; message: string; show: boolean }> = [];
    private idCounter = 0;

    show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
        const id = ++this.idCounter;
        this.toasts.push({ id, type, message, show: false });
        setTimeout(() => {
            const toast = this.toasts.find(t => t.id === id);
            if (toast) toast.show = true;
        }, 10);
        setTimeout(() => this.removeToast(id), 4000);
    }

    removeToast(id: number): void {
        this.toasts = this.toasts.filter(t => t.id !== id);
    }

    getIcon(type: string): string {
        const icons: any = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
        return icons[type] || 'info';
    }
}
