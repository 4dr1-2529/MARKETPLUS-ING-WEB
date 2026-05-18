import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-admin-users',
    template: `
        <div class="admin-page">
            <app-sidebar></app-sidebar>
            <div class="admin-content">
                <div class="admin-header"><h1>Gestion de Usuarios</h1></div>
                <div class="admin-card">
                    <div class="table-container">
                        <table>
                            <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Telefono</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
                            <tbody>
                                <tr *ngFor="let u of users">
                                    <td>{{ u.id }}</td><td>{{ u.nombres }} {{ u.apellidos }}</td><td>{{ u.email }}</td><td>{{ u.telefono || '-' }}</td>
                                    <td><span class="badge badge-{{ u.role === 'admin' ? 'danger' : 'primary' }}">{{ u.role }}</span></td>
                                    <td><span class="badge badge-{{ u.estado === 'activo' ? 'success' : 'danger' }}">{{ u.estado }}</span></td>
                                    <td><button class="btn-icon"><span class="material-icons">edit</span></button></td>
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
        .btn-icon { padding: 6px; background: none; color: var(--primary); border-radius: var(--radius-sm); }
        @media (max-width: 768px) { .admin-content { margin-left: 0; padding: 20px; padding-top: 90px; } }
    `]
})
export class AdminUsersPage implements OnInit {
    users: any[] = [];
    constructor(private adminService: AdminService) {}
    ngOnInit(): void { this.adminService.getUsers().subscribe(res => { this.users = res.data; }); }
}
