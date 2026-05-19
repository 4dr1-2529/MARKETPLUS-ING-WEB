import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cupon } from '../models/coupon.model';

@Injectable({ providedIn: 'root' })
export class CouponService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAll(): Observable<{ success: boolean; data: Cupon[] }> {
        return this.http.get<{ success: boolean; data: Cupon[] }>(`${this.apiUrl}/coupons`);
    }

    validate(code: string, subtotal: number): Observable<{ success: boolean; message: string; data?: { descuento: number; total: number } }> {
        return this.http.post<{ success: boolean; message: string; data?: { descuento: number; total: number } }>(
            `${this.apiUrl}/coupons/validate`,
            { code, subtotal }
        );
    }

    apply(code: string): Observable<{ success: boolean; message: string; data?: Cupon }> {
        return this.http.post<{ success: boolean; message: string; data?: Cupon }>(
            `${this.apiUrl}/coupons/apply`,
            { code }
        );
    }
}
