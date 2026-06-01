import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    private idCounter = 0;
    private toastSubject = new Subject<ToastMessage & { action: 'show' | 'hide' }>();
    toasts$ = this.toastSubject.asObservable();

    show(message: string, type: ToastMessage['type'] = 'info', durationMs = 2500): void {
        const id = ++this.idCounter;
        this.toastSubject.next({ id, type, message, action: 'show' });
        setTimeout(() => this.hide(id), durationMs);
    }

    hide(id: number): void {
        this.toastSubject.next({ id, type: 'info', message: '', action: 'hide' });
    }

    success(message: string): void { this.show(message, 'success'); }
    error(message: string): void { this.show(message, 'error'); }
    warning(message: string): void { this.show(message, 'warning'); }
    info(message: string): void { this.show(message, 'info'); }
}
