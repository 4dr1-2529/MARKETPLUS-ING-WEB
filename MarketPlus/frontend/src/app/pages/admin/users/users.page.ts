import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';

@Component({
    selector: 'app-admin-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.css']
})
export class AdminUsersPage implements OnInit {
    users: any[] = [];
    showModal = false;
    saving = false;
    editForm: any = {};

    constructor(
        private adminService: AdminService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.adminService.getUsers().subscribe({
            next: (res) => { this.users = res.data || []; },
            error: () => this.toast.error('Error al cargar usuarios')
        });
    }

    openEdit(user: any): void {
        this.editForm = {
            id: user.id,
            nombres: user.nombres,
            apellidos: user.apellidos,
            telefono: user.telefono || '',
            estado: user.estado,
            role_id: user.role_id
        };
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
        this.editForm = {};
    }

    saveUser(): void {
        if (!this.editForm.nombres?.trim() || !this.editForm.apellidos?.trim()) {
            this.toast.warning('Nombre y apellidos son obligatorios');
            return;
        }
        const telefono = this.editForm.telefono?.trim();
        if (telefono && !/^\d{9}$/.test(telefono)) {
            this.toast.warning('El telefono debe tener 9 digitos');
            return;
        }
        this.saving = true;
        this.adminService.updateUser(this.editForm.id, {
            nombres: this.editForm.nombres.trim(),
            apellidos: this.editForm.apellidos.trim(),
            telefono: telefono || null,
            estado: this.editForm.estado,
            role_id: Number(this.editForm.role_id)
        }).subscribe({
            next: () => {
                this.saving = false;
                this.toast.success('Usuario actualizado');
                this.closeModal();
                this.loadUsers();
            },
            error: (err) => {
                this.saving = false;
                this.toast.error(getApiErrorMessage(err, 'Error al actualizar usuario'));
            }
        });
    }

    toggleEstado(user: any): void {
        const nuevo = user.estado === 'activo' ? 'suspendido' : 'activo';
        if (!confirm(`¿Cambiar estado a ${nuevo}?`)) return;
        this.adminService.updateUser(user.id, { estado: nuevo }).subscribe({
            next: () => {
                this.toast.success('Estado actualizado');
                this.loadUsers();
            },
            error: () => this.toast.error('Error al actualizar estado')
        });
    }
}
