import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ToastService } from '../../../services/toast.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';
import {
    lettersOnlyError,
    onLettersInput,
    onNumericInput
} from '../../../utils/form-validation.util';

@Component({
    selector: 'app-admin-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.css']
})
export class AdminUsersPage implements OnInit {
    users: any[] = [];
    showModal = false;
    saving = false;
    submitted = false;
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
        this.submitted = false;
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
        this.submitted = false;
        this.editForm = {};
    }

    get nombresError(): string {
        return lettersOnlyError(this.editForm.nombres, 'Los nombres');
    }

    get apellidosError(): string {
        return lettersOnlyError(this.editForm.apellidos, 'Los apellidos');
    }

    get telefonoError(): string {
        const v = String(this.editForm.telefono || '').trim();
        if (!v) return '';
        if (!/^\d{9}$/.test(v)) return 'El telefono debe tener exactamente 9 digitos';
        return '';
    }

    onLettersField(field: 'nombres' | 'apellidos', event: Event): void {
        this.editForm[field] = onLettersInput(event, 80);
    }

    onTelefonoInput(event: Event): void {
        this.editForm.telefono = onNumericInput(event, 9);
    }

    showFieldError(error: string): boolean {
        return this.submitted && !!error;
    }

    saveUser(): void {
        this.submitted = true;
        if (this.nombresError || this.apellidosError || this.telefonoError) {
            this.toast.warning(this.nombresError || this.apellidosError || this.telefonoError);
            return;
        }

        const telefono = String(this.editForm.telefono || '').trim();
        this.saving = true;
        this.adminService.updateUser(this.editForm.id, {
            nombres: String(this.editForm.nombres).trim(),
            apellidos: String(this.editForm.apellidos).trim(),
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
