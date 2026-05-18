import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    template: `
        <aside class="sidebar" [class.collapsed]="collapsed">
            <div class="sidebar-header">
                <span class="material-icons">admin_panel_settings</span>
                <span *ngIf="!collapsed">Panel Admin</span>
            </div>
            <nav class="sidebar-nav">
                <a routerLink="/admin" routerLinkActive="active" class="sidebar-link">
                    <span class="material-icons">dashboard</span>
                    <span *ngIf="!collapsed">Dashboard</span>
                </a>
                <a routerLink="/admin/productos" routerLinkActive="active" class="sidebar-link">
                    <span class="material-icons">inventory_2</span>
                    <span *ngIf="!collapsed">Productos</span>
                </a>
                <a routerLink="/admin/categorias" routerLinkActive="active" class="sidebar-link">
                    <span class="material-icons">category</span>
                    <span *ngIf="!collapsed">Categorias</span>
                </a>
                <a routerLink="/admin/marcas" routerLinkActive="active" class="sidebar-link">
                    <span class="material-icons">branding_watermark</span>
                    <span *ngIf="!collapsed">Marcas</span>
                </a>
                <a routerLink="/admin/pedidos" routerLinkActive="active" class="sidebar-link">
                    <span class="material-icons">receipt_long</span>
                    <span *ngIf="!collapsed">Pedidos</span>
                </a>
                <a routerLink="/admin/inventario" routerLinkActive="active" class="sidebar-link">
                    <span class="material-icons">warehouse</span>
                    <span *ngIf="!collapsed">Inventario</span>
                </a>
                <a routerLink="/admin/usuarios" routerLinkActive="active" class="sidebar-link">
                    <span class="material-icons">group</span>
                    <span *ngIf="!collapsed">Usuarios</span>
                </a>
                <a routerLink="/admin/reportes" routerLinkActive="active" class="sidebar-link">
                    <span class="material-icons">bar_chart</span>
                    <span *ngIf="!collapsed">Reportes</span>
                </a>
                <a routerLink="/" class="sidebar-link">
                    <span class="material-icons">storefront</span>
                    <span *ngIf="!collapsed">Ver Tienda</span>
                </a>
            </nav>
            <button class="sidebar-toggle" (click)="collapsed = !collapsed">
                <span class="material-icons">{{ collapsed ? 'chevron_right' : 'chevron_left' }}</span>
            </button>
        </aside>
    `,
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    collapsed = false;
}
