import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria, Marca } from '../models/index.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAll(conProductos = false): Observable<{ success: boolean; data: Categoria[] }> {
        const url = conProductos
            ? `${this.apiUrl}/categories?con_productos=1`
            : `${this.apiUrl}/categories`;
        return this.http.get<{ success: boolean; data: Categoria[] }>(url);
    }

    getAllAdmin(): Observable<{ success: boolean; data: Categoria[] }> {
        return this.http.get<{ success: boolean; data: Categoria[] }>(`${this.apiUrl}/categories/admin`);
    }

    create(category: Partial<Categoria>): Observable<{ success: boolean; message: string }> {
        return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/categories`, category);
    }

    update(id: number, category: Partial<Categoria>): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/categories/${id}`, category);
    }

    delete(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/categories/${id}`);
    }
}
