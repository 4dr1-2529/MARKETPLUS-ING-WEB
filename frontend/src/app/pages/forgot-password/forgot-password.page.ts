import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.css']
})
export class ForgotPasswordPage {
    email = '';
    newPassword = '';
    resetToken = '';
    step: 'email' | 'reset' = 'email';
    loading = false;

    constructor(
        private auth: AuthService,
        private toast: ToastService,
        private router: Router
    ) {}

    sendEmail(): void {
        if (!this.email) {
            this.toast.warning('Ingresa tu email');
            return;
        }
        this.loading = true;
        this.auth.forgotPassword(this.email).subscribe({
            next: (res) => {
                this.loading = false;
                this.toast.success(res.message);
                if (res.data?.resetToken) {
                    this.resetToken = res.data.resetToken;
                    this.step = 'reset';
                    this.toast.info('Modo desarrollo: usa el token mostrado para restablecer');
                }
            },
            error: (err) => {
                this.loading = false;
                this.toast.error(err.error?.message || 'Error al enviar solicitud');
            }
        });
    }

    resetPassword(): void {
        if (!this.resetToken || !this.newPassword || this.newPassword.length < 8) {
            this.toast.warning('Token y contraseña (mín. 8 caracteres) requeridos');
            return;
        }
        this.loading = true;
        this.auth.resetPassword(this.resetToken, this.newPassword).subscribe({
            next: (res) => {
                this.loading = false;
                this.toast.success(res.message);
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.loading = false;
                this.toast.error(err.error?.message || 'Error al restablecer contraseña');
            }
        });
    }
}
