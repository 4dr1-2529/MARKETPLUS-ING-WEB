import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
    toasts: Array<{ id: number; type: string; message: string; show: boolean }> = [];
    private sub?: Subscription;

    constructor(private toastService: ToastService) {}

    ngOnInit(): void {
        this.sub = this.toastService.toasts$.subscribe(event => {
            if (event.action === 'show') {
                this.toasts.push({ id: event.id, type: event.type, message: event.message, show: false });
                setTimeout(() => {
                    const toast = this.toasts.find(t => t.id === event.id);
                    if (toast) toast.show = true;
                }, 10);
            } else {
                this.toasts = this.toasts.filter(t => t.id !== event.id);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    removeToast(id: number): void {
        this.toastService.hide(id);
    }

    getIcon(type: string): string {
        const icons: Record<string, string> = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };
        return icons[type] || 'info';
    }
}
