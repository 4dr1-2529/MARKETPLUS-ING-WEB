import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const request = token
            ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
            : req;

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // Prevent endless unauthorized calls with stale/invalid tokens.
                if (error.status === 401 && this.auth.isAuthenticated) {
                    this.auth.logout();
                    if (!this.router.url.startsWith('/login')) {
                        this.router.navigate(['/login']);
                    }
                }
                return throwError(() => error);
            })
        );
    }
}
