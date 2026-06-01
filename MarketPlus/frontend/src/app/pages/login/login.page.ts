import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.css']
})
export class LoginPage {
    identifier = '';
    password = '';
    showPassword = false;
    error = '';
    loading = false;

    constructor(private readonly auth: AuthService, private readonly router: Router) {}

    login(): void {
        const identifier = this.identifier.trim();
        const password = this.password;
        if (!identifier || !password) {
            this.error = 'Completa todos los campos';
            return;
        }
        if (/^\d{8,15}$/.test(identifier)) {
            this.error = 'Ingresa email o nombre de usuario, no DNI ni telefono';
            return;
        }
        this.loading = true;
        this.error = '';
        this.auth.login({ identifier, password }).subscribe({
            next: (res) => {
                this.loading = false;
                if (res.data.role === 'admin') {
                    this.router.navigate(['/admin']);
                } else {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                this.loading = false;
                this.error = err.error?.message || 'Error al iniciar sesion';
            }
        });
    }
}
