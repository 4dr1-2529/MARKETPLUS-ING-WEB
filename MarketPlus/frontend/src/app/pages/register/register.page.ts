import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
    EMAIL_REGEX,
    NAME_REGEX,
    USERNAME_REGEX,
    onLettersInput,
    onNumericInput,
    onUsernameInput
} from '../../utils/form-validation.util';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.css']
})
export class RegisterPage {
    username = '';
    nombres = '';
    apellidos = '';
    email = '';
    password = '';
    confirmPassword = '';
    telefono = '';
    dni = '';
    error = '';
    successMessage = '';
    submitted = false;
    loading = false;

    constructor(private readonly auth: AuthService, private readonly router: Router) {}

    get usernameError(): string {
        const value = this.username.trim();
        if (!value) return 'El nombre de usuario es obligatorio';
        if (!USERNAME_REGEX.test(value)) return 'Debe tener 4-20 caracteres y usar letras, numeros, punto, guion o guion bajo';
        if (/^\d{8,15}$/.test(value)) return 'No uses DNI o telefono como nombre de usuario';
        return '';
    }

    get nombresError(): string {
        const value = this.nombres.trim();
        if (!value) return 'Los nombres son obligatorios';
        if (value.length < 2) return 'Los nombres deben tener al menos 2 caracteres';
        if (!NAME_REGEX.test(value)) return 'Los nombres solo pueden contener letras y espacios';
        return '';
    }

    get apellidosError(): string {
        const value = this.apellidos.trim();
        if (!value) return 'Los apellidos son obligatorios';
        if (value.length < 2) return 'Los apellidos deben tener al menos 2 caracteres';
        if (!NAME_REGEX.test(value)) return 'Los apellidos solo pueden contener letras y espacios';
        return '';
    }

    get emailError(): string {
        const value = this.email.trim();
        if (!value) return 'El email es obligatorio';
        if (!EMAIL_REGEX.test(value)) return 'Ingresa un email valido';
        return '';
    }

    get dniError(): string {
        const value = this.dni.trim();
        if (!value) return '';
        if (!/^\d{8}$/.test(value)) return 'El DNI debe tener exactamente 8 digitos';
        return '';
    }

    get telefonoError(): string {
        const value = this.telefono.trim();
        if (!value) return '';
        if (!/^\d{9}$/.test(value)) return 'El telefono debe tener exactamente 9 digitos';
        return '';
    }

    get passwordError(): string {
        if (!this.password) return 'La contraseña es obligatoria';
        if (this.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
        return '';
    }

    get confirmPasswordError(): string {
        if (!this.confirmPassword) return 'Confirmar contraseña es obligatorio';
        if (this.password !== this.confirmPassword) return 'Las contraseñas no coinciden';
        return '';
    }

    get isFormValid(): boolean {
        return !this.usernameError &&
            !this.nombresError &&
            !this.apellidosError &&
            !this.emailError &&
            !this.dniError &&
            !this.telefonoError &&
            !this.passwordError &&
            !this.confirmPasswordError;
    }

    register(): void {
        this.submitted = true;
        if (!this.isFormValid) return;

        this.loading = true;
        this.error = '';
        this.successMessage = '';
        this.auth.register({
            username: this.username.trim(),
            nombres: this.nombres.trim(),
            apellidos: this.apellidos.trim(),
            email: this.email.trim().toLowerCase(),
            password: this.password,
            telefono: this.telefono.trim(),
            dni: this.dni.trim()
        }).subscribe({
            next: (res) => {
                this.loading = false;
                this.successMessage = res.message || 'Cuenta creada correctamente';
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.loading = false;
                this.error = err.error?.message || 'No se pudo crear la cuenta. Intenta nuevamente.';
            }
        });
    }

    onNumericInput(field: 'dni' | 'telefono', event: Event): void {
        const max = field === 'dni' ? 8 : 9;
        const numeric = onNumericInput(event, max);
        if (field === 'dni') this.dni = numeric;
        if (field === 'telefono') this.telefono = numeric;
    }

    onLettersInput(field: 'nombres' | 'apellidos', event: Event): void {
        const value = onLettersInput(event, 80);
        if (field === 'nombres') this.nombres = value;
        if (field === 'apellidos') this.apellidos = value;
    }

    onUsernameField(event: Event): void {
        this.username = onUsernameInput(event, 20);
    }
}
