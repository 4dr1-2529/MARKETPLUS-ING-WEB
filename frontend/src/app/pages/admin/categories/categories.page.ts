import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

@Component({
    selector: 'app-admin-categories',
    template: `
        <div class="admin-page">
            <app-sidebar></app-sidebar>
            <div class="admin-content">
                <div class="admin-header">
                    <h1>Gestion de Categorias</h1>
                    <button class="btn btn-primary"><span class="material-icons">add</span> Nueva Categoria</button>
                </div>
                <div class="admin-card">
                    <div class="table-container">
                        <table>
                            <thead><tr><th>ID</th><th>Nombre</th><th>Slug</th><th>Productos</th><th>Estado</th><th>Acciones</th></tr></thead>
                            <tbody>
                                <tr *ngFor="let c of categories">
                                    <td>{{ c.id }}</td><td>{{ c.nombre }}</td><td>{{ c.slug }}</td>
                                    <td>{{ c.total_productos || 0 }}</td>
                                    <td><span class="badge badge-{{ c.estado === 'activo' ? 'success' : 'danger' }}">{{ c.estado }}</span></td>
                                    <td><button class="btn-icon"><span class="material-icons">edit</span></button><button class="btn-icon btn-icon-danger"><span class="material-icons">delete</span></button></td>
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
export class AdminCategoriesPage implements OnInit {
    categories: any[] = [];
    constructor(private categoryService: CategoryService) {}
    ngOnInit(): void { this.categoryService.getAllAdmin().subscribe(res => { this.categories = res.data; }); }
}
