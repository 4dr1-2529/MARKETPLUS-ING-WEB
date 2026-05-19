import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto, ProductoResponse, ProductoDetailResponse } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAll(params: any = {}): Observable<ProductoResponse> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                httpParams = httpParams.set(key, String(params[key]));
            }
        });
        return this.http.get<ProductoResponse>(`${this.apiUrl}/products`, { params: httpParams });
    }

    getFeatured(): Observable<{ success: boolean; data: Producto[] }> {
        return this.http.get<{ success: boolean; data: Producto[] }>(`${this.apiUrl}/products/destacados`);
    }

    getBySlug(slug: string): Observable<ProductoDetailResponse> {
        return this.http.get<ProductoDetailResponse>(`${this.apiUrl}/products/${slug}`);
    }

    create(product: Partial<Producto>): Observable<{ success: boolean; message: string; data: any }> {
        return this.http.post<{ success: boolean; message: string; data: any }>(`${this.apiUrl}/products`, product);
    }

    update(id: number, product: Partial<Producto>): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/products/${id}`, product);
    }

    delete(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/products/${id}`);
    }
}
