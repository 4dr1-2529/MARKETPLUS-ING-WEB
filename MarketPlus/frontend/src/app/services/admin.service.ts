import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getDashboard(): Observable<{ success: boolean; data: any }> {
        return this.http.get<{ success: boolean; data: any }>(`${this.apiUrl}/admin/dashboard`);
    }

    getUsers(): Observable<{ success: boolean; data: any[] }> {
        return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}/admin/users`);
    }

    updateUser(id: number, data: any): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/admin/users/${id}`, data);
    }

    getInventory(): Observable<{ success: boolean; data: any[] }> {
        return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}/admin/inventory`);
    }

    updateInventory(id: number, data: any): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/admin/inventory/${id}`, data);
    }

    updateInventoryBatch(items: { producto_id: number; stock: number }[]): Observable<{ success: boolean; message: string; data?: { updated: number } }> {
        return this.http.put<{ success: boolean; message: string; data?: { updated: number } }>(
            `${this.apiUrl}/admin/inventory/batch`,
            { items }
        );
    }

    getReports(): Observable<{ success: boolean; data: any }> {
        return this.http.get<{ success: boolean; data: any }>(`${this.apiUrl}/admin/reports`);
    }
}
