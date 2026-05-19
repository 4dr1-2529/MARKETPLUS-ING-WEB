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
        if (this.nombres.trim().length < 2) {
            this.error = 'Los nombres deben tener al menos 2 caracteres';
            return;
        }
        if (this.apellidos.trim().length < 2) {
            this.error = 'Los apellidos deben tener al menos 2 caracteres';
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            this.error = 'Ingresa un email valido';
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
        if (this.dni && (this.dni.length !== 8 || !/^\d+$/.test(this.dni))) {
            this.error = 'El DNI debe tener exactamente 8 digitos';
            return;
        }
        if (this.telefono && (this.telefono.length !== 9 || !/^\d+$/.test(this.telefono))) {
            this.error = 'El telefono debe tener exactamente 9 digitos';
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
