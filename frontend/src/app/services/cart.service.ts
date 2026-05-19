import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarritoItem, CarritoResponse } from '../models/index.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    private apiUrl = environment.apiUrl;
    private countSubject = new BehaviorSubject<number>(0);
    count$ = this.countSubject.asObservable();

    constructor(private http: HttpClient) {}

    getCart(): Observable<CarritoResponse> {
        return this.http.get<CarritoResponse>(`${this.apiUrl}/cart`);
    }

    addToCart(producto_id: number, cantidad: number = 1): Observable<{ success: boolean; message: string }> {
        return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/cart/add`, { producto_id, cantidad });
    }

    updateQuantity(id: number, cantidad: number): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/cart/item/${id}`, { cantidad });
    }

    removeFromCart(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/cart/item/${id}`);
    }

    clearCart(): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/cart/clear`);
    }

    updateCount(count: number): void {
        this.countSubject.next(count);
    }

    getCount(): number {
        return this.countSubject.value;
    }
}
