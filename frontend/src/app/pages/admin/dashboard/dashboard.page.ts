import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.css']
})
export class AdminDashboardPage implements OnInit {
    stats: any = {};
    ventasMensuales: any[] = [];
    topProductos: any[] = [];
    pedidosRecientes: any[] = [];
    loading = true;

    constructor(private adminService: AdminService) {}

    ngOnInit(): void { this.loadDashboard(); }

    loadDashboard(): void {
        this.adminService.getDashboard().subscribe({
            next: (res) => {
                this.stats = res.data.stats;
                this.ventasMensuales = res.data.ventas_mensuales;
                this.topProductos = res.data.top_productos;
                this.pedidosRecientes = res.data.pedidos_recientes;
                this.loading = false;
            },
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
            'cancelado': 'badge-danger'
        };
        return badges[estado] || 'badge-warning';
    }
}
