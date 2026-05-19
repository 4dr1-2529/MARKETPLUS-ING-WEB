import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Usuario } from '../../models/usuario.model';
import { fadeInAnimation } from '../../shared/animations';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.css'],
    animations: [fadeInAnimation]
})
export class ProfilePage implements OnInit {
    user: Usuario | null = null;
    editing = false;
    formData: any = {};
    activeTab = 'info';

    passwordData = {
        passwordActual: '',
        nuevaPassword: '',
        confirmarPassword: ''
    };
    passwordLoading = false;
    showPassword = false;

    constructor(
        private auth: AuthService,
        private toast: ToastService
    ) {}

    ngOnInit(): void {
        this.loadProfile();
    }

    loadProfile(): void {
        this.auth.getProfile().subscribe({
            next: (res) => {
                this.user = res.data;
                this.formData = { ...res.data };
            },
            error: () => this.toast.error('Error al cargar perfil')
        });
    }

    saveProfile(): void {
        this.auth.updateProfile(this.formData).subscribe({
            next: () => {
                this.editing = false;
                this.toast.success('Perfil actualizado');
                this.loadProfile();
            },
            error: () => this.toast.error('Error al actualizar perfil')
        });
    }

    changePassword(): void {
        if (!this.passwordData.passwordActual) {
            this.toast.warning('Ingresa tu password actual');
            return;
        }
        if (!this.passwordData.nuevaPassword || this.passwordData.nuevaPassword.length < 6) {
            this.toast.warning('La nueva password debe tener al menos 6 caracteres');
            return;
        }
        if (this.passwordData.nuevaPassword !== this.passwordData.confirmarPassword) {
            this.toast.warning('Las passwords no coinciden');
            return;
        }

        this.passwordLoading = true;
        this.auth.changePassword(this.passwordData.passwordActual, this.passwordData.nuevaPassword).subscribe({
            next: (res) => {
                this.passwordLoading = false;
                this.toast.success(res.message);
                this.passwordData = { passwordActual: '', nuevaPassword: '', confirmarPassword: '' };
            },
            error: () => {
                this.passwordLoading = false;
                this.toast.error('Error al cambiar password');
            }
        });
    }

    getPasswordStrength(password: string): string {
        if (!password) return '';
        if (password.length < 6) return 'weak';
        if (password.length < 10) return 'medium';
        return 'strong';
    }

    getPasswordStrengthText(strength: string): string {
        const texts: Record<string, string> = { weak: 'Debil', medium: 'Media', strong: 'Fuerte' };
        return texts[strength] || '';
    }
}
