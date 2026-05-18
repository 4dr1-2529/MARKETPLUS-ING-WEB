import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-admin-reports',
    template: `
        <div class="admin-page">
            <app-sidebar></app-sidebar>
            <div class="admin-content">
                <div class="admin-header"><h1>Reportes y Estadisticas</h1></div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background: rgba(108,92,231,0.1); color: var(--primary);">
                            <span class="material-icons">trending_up</span>
                        </div>
                        <div class="stat-info">
                            <h3>{{ stats.pedidos_mes || 0 }}</h3>
                            <p>Pedidos este Mes</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: rgba(0,184,148,0.1); color: var(--success);">
                            <span class="material-icons">savings</span>
                        </div>
                        <div class="stat-info">
                            <h3>S/ {{ stats.ingresos_mes || 0 | number:'1.2-2' }}</h3>
                            <p>Ingresos del Mes</p>
                        </div>
                    </div>
                </div>

                <div class="admin-grid">
                    <div class="admin-card">
                        <h2>Resumen por Estado de Pedidos</h2>
                        <div class="report-list">
                            <div class="report-item" *ngFor="let item of orderStatusSummary">
                                <span class="report-label">{{ item.estado }}</span>
                                <span class="report-value">{{ item.total }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="admin-card">
                        <h2>Top Categorias por Ventas</h2>
                        <div class="report-list">
                            <div class="report-item" *ngFor="let cat of topCategories">
                                <span class="report-label">{{ cat.nombre }}</span>
                                <span class="report-value">{{ cat.total }} productos</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="admin-card" style="margin-top: 24px;">
                    <h2>Informacion del Sistema</h2>
                    <div class="system-info">
                        <div class="info-row"><span>Version</span><span>1.0.0</span></div>
                        <div class="info-row"><span>Framework</span><span>Angular 17 + Node.js + Express</span></div>
                        <div class="info-row"><span>Base de Datos</span><span>MySQL 8.0</span></div>
                        <div class="info-row"><span>Autenticacion</span><span>JWT (JSON Web Token)</span></div>
                        <div class="info-row"><span>Moneda</span><span>Sol Peruano (S/)</span></div>
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
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 32px; }
        .stat-card { display: flex; align-items: center; gap: 20px; background: var(--white); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm); }
        .stat-icon { width: 60px; height: 60px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; }
        .stat-icon .material-icons { font-size: 28px; }
        .stat-info h3 { font-size: 24px; font-weight: 800; }
        .stat-info p { font-size: 14px; color: var(--dark-light); }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .admin-card { background: var(--white); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm); }
        .admin-card h2 { font-size: 18px; font-weight: 700; margin-bottom: 20px; }
        .report-list { display: flex; flex-direction: column; gap: 12px; }
        .report-item { display: flex; justify-content: space-between; padding: 12px 16px; background: var(--light); border-radius: var(--radius-sm); }
        .report-label { font-weight: 600; }
        .report-value { font-weight: 700; color: var(--primary); }
        .system-info { display: flex; flex-direction: column; gap: 12px; }
        .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--gray-light); }
        .info-row span:first-child { color: var(--dark-light); }
        .info-row span:last-child { font-weight: 600; }
        @media (max-width: 1200px) { .admin-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .admin-content { margin-left: 0; padding: 20px; padding-top: 90px; } }
    `]
})
export class AdminReportsPage implements OnInit {
    stats: any = {};
    orderStatusSummary: any[] = [];
    topCategories: any[] = [];

    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.adminService.getDashboard().subscribe({
            next: (res) => {
                this.stats = res.data.stats;
                this.orderStatusSummary = [
                    { estado: 'Pendiente', total: 2 },
                    { estado: 'Confirmado', total: 1 },
                    { estado: 'Procesando', total: 1 },
                    { estado: 'Enviado', total: 1 },
                    { estado: 'Entregado', total: 1 }
                ];
                this.topCategories = [
                    { nombre: 'Celulares y Smartphones', total: 5 },
                    { nombre: 'Laptops y Computadoras', total: 5 },
                    { nombre: 'Audifonos y Audio', total: 3 },
                    { nombre: 'Smartwatch y Wearables', total: 3 },
                    { nombre: 'Accesorios', total: 3 }
                ];
            }
        });
    }
}
