import { Component } from '@angular/core';

@Component({
    selector: 'app-forgot-password',
    template: `
        <div class="auth-page">
            <div class="auth-container">
                <div class="auth-card animate-scale">
                    <div class="auth-header">
                        <a routerLink="/" class="auth-logo">
                            <span class="material-icons">storefront</span>
                            <span>Market<span class="highlight">Plus</span></span>
                        </a>
                        <h2>Recuperar Contraseña</h2>
                        <p>Ingresa tu email para recibir instrucciones</p>
                    </div>
                    <form (ngSubmit)="sendEmail()" class="auth-form">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" [(ngModel)]="email" name="email" class="form-control" placeholder="tu@email.com" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block btn-lg">Enviar Instrucciones</button>
                    </form>
                    <div class="auth-footer">
                        <p><a routerLink="/login">Volver al login</a></p>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--light) 0%, #E8E6FF 100%); padding: 40px 20px; }
        .auth-container { width: 100%; max-width: 440px; }
        .auth-card { background: var(--white); border-radius: var(--radius-lg); padding: 40px; box-shadow: var(--shadow-lg); }
        .auth-header { text-align: center; margin-bottom: 32px; }
        .auth-logo { display: inline-flex; align-items: center; gap: 8px; font-size: 24px; font-weight: 800; color: var(--dark); margin-bottom: 24px; }
        .auth-logo .material-icons { color: var(--primary); font-size: 28px; }
        .auth-logo .highlight { color: var(--primary); }
        .auth-header h2 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
        .auth-header p { color: var(--dark-light); font-size: 14px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px; }
        .form-control { width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--radius-sm); font-size: 14px; }
        .auth-footer { text-align: center; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--gray-light); font-size: 14px; }
        .auth-footer a { color: var(--primary); font-weight: 600; }
    `]
})
export class ForgotPasswordPage {
    email = '';
    sendEmail(): void {
        alert('Se enviaron las instrucciones a ' + this.email);
    }
}
