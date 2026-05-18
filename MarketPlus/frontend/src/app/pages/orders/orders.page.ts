import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Pedido } from '../../models/index.model';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.css']
})
export class OrdersPage implements OnInit {
    orders: Pedido[] = [];
    loading = true;

    constructor(private orderService: OrderService) {}

    ngOnInit(): void { this.loadOrders(); }

    loadOrders(): void {
        this.orderService.getMyOrders().subscribe({
            next: (res) => { this.orders = res.data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    getStatusBadge(estado: string): string {
        const badges: any = {
            'pendiente': 'badge-warning',
            'confirmado': 'badge-info',
            'procesando': 'badge-primary',
            'enviado': 'badge-success',
            'entregado': 'badge-success',
            'cancelado': 'badge-danger',
            'devuelto': 'badge-danger'
        };
        return badges[estado] || 'badge-warning';
    }
}
