import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Usuario } from '../../models/usuario.model';
import { fadeInAnimation } from '../../shared/animations';
import { getApiErrorMessage } from '../../utils/api-error.util';
import {
    lettersOnlyError,
    onLettersInput,
    onNumericInput
} from '../../utils/form-validation.util';

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
    profileSubmitted = false;

    passwordData = {
        passwordActual: '',
        nuevaPassword: '',
        confirmarPassword: ''
    };
    passwordLoading = false;
    showPassword = false;
    profileSaving = false;

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
                this.formData = {
                    nombres: res.data.nombres || '',
                    apellidos: res.data.apellidos || '',
                    telefono: res.data.telefono || '',
                    dni: res.data.dni || ''
                };
            },
            error: () => this.toast.error('Error al cargar perfil')
        });
    }

    get nombresError(): string {
        return lettersOnlyError(this.formData.nombres, 'Los nombres');
    }

    get apellidosError(): string {
        return lettersOnlyError(this.formData.apellidos, 'Los apellidos');
    }

    get telefonoError(): string {
        const v = String(this.formData.telefono || '').trim();
        if (!v) return '';
        if (!/^\d{9}$/.test(v)) return 'El telefono debe tener exactamente 9 digitos';
        return '';
    }

    get dniError(): string {
        const v = String(this.formData.dni || '').trim();
        if (!v) return '';
        if (!/^\d{8}$/.test(v)) return 'El DNI debe tener exactamente 8 digitos';
        return '';
    }

    onLettersField(field: 'nombres' | 'apellidos', event: Event): void {
        const value = onLettersInput(event, 80);
        this.formData[field] = value;
    }

    onNumericField(field: 'telefono' | 'dni', event: Event): void {
        const max = field === 'dni' ? 8 : 9;
        this.formData[field] = onNumericInput(event, max);
    }

    showFieldError(error: string): boolean {
        return this.profileSubmitted && !!error;
    }

    private buildProfilePayload(): Partial<Usuario> | null {
        if (this.nombresError || this.apellidosError || this.telefonoError || this.dniError) {
            this.toast.warning(
                this.nombresError || this.apellidosError || this.telefonoError || this.dniError
            );
            return null;
        }

        return {
            nombres: String(this.formData.nombres || '').trim(),
            apellidos: String(this.formData.apellidos || '').trim(),
            telefono: String(this.formData.telefono || '').trim(),
            dni: String(this.formData.dni || '').trim()
        };
    }

    saveProfile(): void {
        this.profileSubmitted = true;
        const payload = this.buildProfilePayload();
        if (!payload) return;

        this.profileSaving = true;
        this.auth.updateProfile(payload).subscribe({
            next: () => {
                this.profileSaving = false;
                this.profileSubmitted = false;
                this.editing = false;
                this.toast.success('Perfil actualizado');
                this.loadProfile();
            },
            error: (err) => {
                this.profileSaving = false;
                this.toast.error(getApiErrorMessage(err, 'Error al actualizar perfil'));
            }
        });
    }

    changePassword(): void {
        if (!this.passwordData.passwordActual) {
            this.toast.warning('Ingresa tu contraseña actual');
            return;
        }
        if (!this.passwordData.nuevaPassword || this.passwordData.nuevaPassword.length < 8) {
            this.toast.warning('La nueva contraseña debe tener al menos 8 caracteres');
            return;
        }
        if (this.passwordData.nuevaPassword !== this.passwordData.confirmarPassword) {
            this.toast.warning('Las contraseñas no coinciden');
            return;
        }

        this.passwordLoading = true;
        this.auth.changePassword(this.passwordData.passwordActual, this.passwordData.nuevaPassword).subscribe({
            next: (res) => {
                this.passwordLoading = false;
                this.toast.success(res.message);
                this.passwordData = { passwordActual: '', nuevaPassword: '', confirmarPassword: '' };
            },
            error: (err) => {
                this.passwordLoading = false;
                this.toast.error(getApiErrorMessage(err, 'Error al cambiar contraseña'));
            }
        });
    }

    getPasswordStrength(password: string): string {
        if (!password) return '';
        if (password.length < 8) return 'weak';
        if (password.length < 10) return 'medium';
        return 'strong';
    }

    getPasswordStrengthText(strength: string): string {
        const texts: Record<string, string> = { weak: 'Debil', medium: 'Media', strong: 'Fuerte' };
        return texts[strength] || '';
    }
}
