import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pedido, DashboardStats } from '../models/index.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    createOrder(data: any): Observable<{ success: boolean; message: string; data: any }> {
        return this.http.post<{ success: boolean; message: string; data: any }>(`${this.apiUrl}/orders`, data);
    }

    getMyOrders(): Observable<{ success: boolean; data: Pedido[] }> {
        return this.http.get<{ success: boolean; data: Pedido[] }>(`${this.apiUrl}/orders/my-orders`);
    }

    getOrderDetail(numero: string): Observable<{ success: boolean; data: any }> {
        return this.http.get<{ success: boolean; data: any }>(`${this.apiUrl}/orders/${numero}`);
    }

    getAllAdmin(params: any = {}): Observable<{ success: boolean; data: Pedido[]; pagination: any }> {
        let httpParams: any = {};
        Object.keys(params).forEach(key => { if (params[key]) httpParams[key] = params[key]; });
        return this.http.get<{ success: boolean; data: Pedido[]; pagination: any }>(`${this.apiUrl}/orders/admin/all`, { params: httpParams });
    }

    updateStatus(id: number, estado: string): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/orders/admin/${id}/status`, { estado });
    }
}
