import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.css']
})
export class LoginPage {
    email = '';
    password = '';
    showPassword = false;
    error = '';
    loading = false;

    constructor(private auth: AuthService, private router: Router) {}

    login(): void {
        if (!this.email || !this.password) {
            this.error = 'Completa todos los campos';
            return;
        }
        this.loading = true;
        this.error = '';
        this.auth.login({ email: this.email, password: this.password }).subscribe({
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
