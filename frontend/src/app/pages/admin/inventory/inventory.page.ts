import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-admin-inventory',
    template: `
        <div class="admin-page">
            <app-sidebar></app-sidebar>
            <div class="admin-content">
                <div class="admin-header"><h1>Gestion de Inventario</h1></div>
                <div class="admin-card">
                    <div class="table-container">
                        <table>
                            <thead><tr><th>Producto</th><th>SKU</th><th>Categoria</th><th>Marca</th><th>Stock</th><th>Min</th><th>Ubicacion</th><th>Estado</th></tr></thead>
                            <tbody>
                                <tr *ngFor="let item of inventory">
                                    <td>{{ item.nombre }}</td>
                                    <td><code>{{ item.sku }}</code></td>
                                    <td>{{ item.categoria }}</td>
                                    <td>{{ item.marca }}</td>
                                    <td>
                                        <input type="number" [(ngModel)]="item.stock" (change)="updateStock(item.producto_id, item.stock, item.stock_minimo)" class="stock-input">
                                    </td>
                                    <td>
                                        <input type="number" [(ngModel)]="item.stock_minimo" (change)="updateStock(item.producto_id, item.stock, item.stock_minimo)" class="stock-input">
                                    </td>
                                    <td>{{ item.ubicacion }}</td>
                                    <td>
                                        <span class="badge" [class]="item.stock <= item.stock_minimo ? 'badge-danger' : 'badge-success'">
                                            {{ item.stock <= item.stock_minimo ? 'Bajo Stock' : 'OK' }}
                                        </span>
                                    </td>
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
        .stock-input { width: 70px; padding: 6px 8px; border: 2px solid var(--gray-light); border-radius: var(--radius-sm); font-size: 13px; text-align: center; }
        .stock-input:focus { border-color: var(--primary); }
        code { background: var(--light); padding: 2px 8px; border-radius: 4px; font-size: 12px; }
        @media (max-width: 768px) { .admin-content { margin-left: 0; padding: 20px; padding-top: 90px; } }
    `]
})
export class AdminInventoryPage implements OnInit {
    inventory: any[] = [];
    constructor(private adminService: AdminService) {}
    ngOnInit(): void { this.adminService.getInventory().subscribe(res => { this.inventory = res.data; }); }
    updateStock(id: number, stock: number, min: number): void {
        this.adminService.updateInventory(id, { stock, stock_minimo: min }).subscribe();
    }
}
