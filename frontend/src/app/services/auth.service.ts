import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiUrl;
    private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadUser();
    }

    private loadUser(): void {
        const user = localStorage.getItem('user');
        if (user) {
            this.currentUserSubject.next(JSON.parse(user));
        }
    }

    get token(): string | null {
        return localStorage.getItem('token');
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }

    get isAdmin(): boolean {
        const user = this.currentUserSubject.value;
        return user?.role === 'admin';
    }

    get currentUser(): Usuario | null {
        return this.currentUserSubject.value;
    }

    login(data: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
            tap(response => {
                if (response.success) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    this.currentUserSubject.next(response.data);
                }
            })
        );
    }

    register(data: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data).pipe(
            tap(response => {
                if (response.success) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    this.currentUserSubject.next(response.data);
                }
            })
        );
    }

    getProfile(): Observable<{ success: boolean; data: Usuario }> {
        return this.http.get<{ success: boolean; data: Usuario }>(`${this.apiUrl}/auth/profile`);
    }

    updateProfile(data: Partial<Usuario>): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/auth/profile`, data);
    }

    forgotPassword(email: string): Observable<{ success: boolean; message: string; data?: { resetToken?: string } }> {
        return this.http.post<{ success: boolean; message: string; data?: { resetToken?: string } }>(
            `${this.apiUrl}/auth/forgot-password`,
            { email }
        );
    }

    resetPassword(token: string, password: string): Observable<{ success: boolean; message: string }> {
        return this.http.post<{ success: boolean; message: string }>(
            `${this.apiUrl}/auth/reset-password`,
            { token, password }
        );
    }

    changePassword(passwordActual: string, nuevaPassword: string): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(
            `${this.apiUrl}/auth/change-password`,
            { passwordActual, nuevaPassword }
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    }
}
