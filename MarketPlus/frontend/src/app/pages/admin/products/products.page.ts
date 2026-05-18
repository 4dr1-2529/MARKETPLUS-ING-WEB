import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Producto } from '../../../models/producto.model';

@Component({
    selector: 'app-admin-products',
    template: `
        <div class="admin-page">
            <app-sidebar></app-sidebar>
            <div class="admin-content">
                <div class="admin-header">
                    <h1>Gestion de Productos</h1>
                    <button class="btn btn-primary"><span class="material-icons">add</span> Nuevo Producto</button>
                </div>
                <div class="admin-card">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr><th>ID</th><th>Nombre</th><th>Categoria</th><th>Marca</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let p of products">
                                    <td>{{ p.id }}</td>
                                    <td>{{ p.nombre }}</td>
                                    <td>{{ p.categoria }}</td>
                                    <td>{{ p.marca }}</td>
                                    <td>S/ {{ p.precio | number:'1.2-2' }}</td>
                                    <td>{{ p.visitas }}</td>
                                    <td><span class="badge badge-{{ p.estado === 'activo' ? 'success' : 'danger' }}">{{ p.estado }}</span></td>
                                    <td>
                                        <button class="btn-icon"><span class="material-icons">edit</span></button>
                                        <button class="btn-icon btn-icon-danger"><span class="material-icons">delete</span></button>
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
        th { text-align: left; padding: 12px 16px; font-size: 13px; font-weight: 600; color: var(--dark-light); border-bottom: 2px solid var(--gray-light); }
        td { padding: 12px 16px; font-size: 14px; border-bottom: 1px solid var(--gray-light); }
        tr:hover td { background: var(--light); }
        .btn-icon { padding: 6px; background: none; color: var(--primary); border-radius: var(--radius-sm); }
        .btn-icon-danger { color: var(--danger); }
        @media (max-width: 768px) { .admin-content { margin-left: 0; padding: 20px; padding-top: 90px; } }
    `]
})
export class AdminProductsPage implements OnInit {
    products: Producto[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getAll({ limit: 100 }).subscribe(res => { this.products = res.data; });
    }
}
