import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
    selector: 'app-admin-orders',
    template: `
        <div class="admin-page">
            <app-sidebar></app-sidebar>
            <div class="admin-content">
                <div class="admin-header"><h1>Gestion de Pedidos</h1></div>
                <div class="admin-card">
                    <div class="table-container">
                        <table>
                            <thead><tr><th>Nº Pedido</th><th>Cliente</th><th>Email</th><th>Total</th><th>Metodo</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
                            <tbody>
                                <tr *ngFor="let o of orders">
                                    <td><strong>{{ o.numero_pedido }}</strong></td>
                                    <td>{{ o.nombres }} {{ o.apellidos }}</td>
                                    <td>{{ o.email }}</td>
                                    <td>S/ {{ o.total | number:'1.2-2' }}</td>
                                    <td>{{ o.metodo_pago }}</td>
                                    <td>
                                        <select [(ngModel)]="o.estado" (change)="updateStatus(o.id, o.estado)" class="status-select">
                                            <option value="pendiente">Pendiente</option>
                                            <option value="confirmado">Confirmado</option>
                                            <option value="procesando">Procesando</option>
                                            <option value="enviado">Enviado</option>
                                            <option value="entregado">Entregado</option>
                                            <option value="cancelado">Cancelado</option>
                                        </select>
                                    </td>
                                    <td>{{ o.creado_en | date:'dd/MM/yyyy' }}</td>
                                    <td><button class="btn-icon"><span class="material-icons">visibility</span></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .admin-page { display: flex; min-height: 100vh; }
        .admin-content { flex: 1; margin-left: 260px; padding: 32px; padding-top: 100px; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .admin-header h1 { font-size: 28px; font-weight: 800; }
        .admin-card { background: var(--white); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm); }
        .table-container { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px 16px; font-size: 13px; font-weight: 600; color: var(--dark-light); border-bottom: 2px solid var(--gray-light); white-space: nowrap; }
        td { padding: 12px 16px; font-size: 14px; border-bottom: 1px solid var(--gray-light); }
        tr:hover td { background: var(--light); }
        .status-select { padding: 6px 10px; border: 2px solid var(--gray-light); border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; }
        .btn-icon { padding: 6px; background: none; color: var(--primary); border-radius: var(--radius-sm); }
        @media (max-width: 768px) { .admin-content { margin-left: 0; padding: 20px; padding-top: 90px; } }
    `]
})
export class AdminOrdersPage implements OnInit {
    orders: any[] = [];
    constructor(private orderService: OrderService) {}
    ngOnInit(): void { this.orderService.getAllAdmin().subscribe(res => { this.orders = res.data; }); }
    updateStatus(id: number, estado: string): void {
        this.orderService.updateStatus(id, estado).subscribe();
    }
}
