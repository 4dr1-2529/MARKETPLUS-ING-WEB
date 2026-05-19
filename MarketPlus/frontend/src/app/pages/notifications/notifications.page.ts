import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { ToastService } from '../../services/toast.service';
import { Notificacion } from '../../models/notification.model';
import { fadeInAnimation } from '../../shared/animations';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.css'],
    animations: [fadeInAnimation]
})
export class NotificationsPage implements OnInit {
    notifications: Notificacion[] = [];
    loading = true;
    filter = 'all';

    constructor(
        private notificationService: NotificationService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.loadNotifications();
    }

    loadNotifications(): void {
        this.loading = true;
        this.notificationService.getAll().subscribe({
            next: (res) => {
                this.notifications = res.data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.toast.error('Error al cargar notificaciones');
            }
        });
    }

    get filteredNotifications(): Notificacion[] {
        if (this.filter === 'all') return this.notifications;
        if (this.filter === 'unread') return this.notifications.filter(n => !n.leido);
        return this.notifications.filter(n => n.tipo === this.filter);
    }

    get unreadCount(): number {
        return this.notifications.filter(n => !n.leido).length;
    }

    markAsRead(id: number): void {
        this.notificationService.markAsRead(id).subscribe({
            next: () => {
                const notif = this.notifications.find(n => n.id === id);
                if (notif) notif.leido = true;
            },
            error: () => this.toast.error('Error al marcar como leida')
        });
    }

    markAllAsRead(): void {
        this.notificationService.markAllAsRead().subscribe({
            next: () => {
                this.notifications.forEach(n => n.leido = true);
                this.toast.success('Todas marcadas como leidas');
            },
            error: () => this.toast.error('Error al marcar todas')
        });
    }

    deleteNotification(id: number): void {
        this.notificationService.delete(id).subscribe({
            next: () => {
                this.notifications = this.notifications.filter(n => n.id !== id);
                this.toast.success('Notificacion eliminada');
            },
            error: () => this.toast.error('Error al eliminar')
        });
    }

    getTipoIcon(tipo: string): string {
        const icons: Record<string, string> = {
            pedido: 'local_shipping',
            oferta: 'local_offer',
            sistema: 'notifications',
            promocion: 'campaign',
            seguridad: 'security'
        };
        return icons[tipo] || 'notifications';
    }

    getTipoColor(tipo: string): string {
        const colors: Record<string, string> = {
            pedido: 'var(--primary)',
            oferta: 'var(--success)',
            sistema: 'var(--dark-light)',
            promocion: 'var(--warning)',
            seguridad: 'var(--danger)'
        };
        return colors[tipo] || 'var(--gray)';
    }

    getRelativeDate(dateStr: string): string {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMin = Math.floor(diffMs / 60000);
        const diffHr = Math.floor(diffMs / 3600000);
        const diffDay = Math.floor(diffMs / 86400000);

        if (diffMin < 1) return 'Ahora mismo';
        if (diffMin < 60) return `Hace ${diffMin} min`;
        if (diffHr < 24) return `Hace ${diffHr}h`;
        if (diffDay < 7) return `Hace ${diffDay} dia(s)`;
        return date.toLocaleDateString('es-PE');
    }
}
