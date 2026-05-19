import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { slideUpAnimation } from '../../shared/animations';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.page.html',
    styleUrls: ['./order-detail.page.css'],
    animations: [slideUpAnimation]
})
export class OrderDetailPage implements OnInit {
    numero = '';
    order: any = null;
    loading = true;

    readonly statusSteps = ['pendiente', 'confirmado', 'procesando', 'enviado', 'entregado'];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService
    ) {}

    ngOnInit(): void {
        this.numero = this.route.snapshot.paramMap.get('numero') || '';
        if (!this.numero) {
            this.router.navigate(['/mis-pedidos']);
            return;
        }
        this.orderService.getOrderDetail(this.numero).subscribe({
            next: (res) => {
                this.order = res.data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.router.navigate(['/mis-pedidos']);
            }
        });
    }

    getStepIndex(estado: string): number {
        const idx = this.statusSteps.indexOf(estado);
        return idx >= 0 ? idx : 0;
    }

    isStepComplete(step: string): boolean {
        if (!this.order) return false;
        return this.getStepIndex(this.order.estado) >= this.getStepIndex(step);
    }

    getStatusLabel(estado: string): string {
        const labels: Record<string, string> = {
            pendiente: 'Pendiente',
            confirmado: 'Confirmado',
            procesando: 'En preparación',
            enviado: 'En camino',
            entregado: 'Entregado',
            cancelado: 'Cancelado',
            devuelto: 'Devuelto'
        };
        return labels[estado] || estado;
    }
}
