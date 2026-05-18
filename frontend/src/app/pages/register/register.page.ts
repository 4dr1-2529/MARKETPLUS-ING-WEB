import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.css']
})
export class RegisterPage {
    nombres = '';
    apellidos = '';
    email = '';
    password = '';
    confirmPassword = '';
    telefono = '';
    dni = '';
    error = '';
    loading = false;

    constructor(private auth: AuthService, private router: Router) {}

    register(): void {
        if (!this.nombres || !this.apellidos || !this.email || !this.password) {
            this.error = 'Completa todos los campos obligatorios';
            return;
        }
        if (this.password !== this.confirmPassword) {
            this.error = 'Las contraseñas no coinciden';
            return;
        }
        if (this.password.length < 6) {
            this.error = 'La contraseña debe tener al menos 6 caracteres';
            return;
        }
        this.loading = true;
        this.error = '';
        this.auth.register({
            nombres: this.nombres,
            apellidos: this.apellidos,
            email: this.email,
            password: this.password,
            telefono: this.telefono,
            dni: this.dni
        }).subscribe({
            next: () => { this.loading = false; this.router.navigate(['/']); },
            error: (err) => { this.loading = false; this.error = err.error?.message || 'Error al registrar'; }
        });
    }
}
