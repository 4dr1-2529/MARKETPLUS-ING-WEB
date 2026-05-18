import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Marca } from '../models/index.model';

@Injectable({ providedIn: 'root' })
export class BrandService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAll(): Observable<{ success: boolean; data: Marca[] }> {
        return this.http.get<{ success: boolean; data: Marca[] }>(`${this.apiUrl}/brands`);
    }

    getAllAdmin(): Observable<{ success: boolean; data: Marca[] }> {
        return this.http.get<{ success: boolean; data: Marca[] }>(`${this.apiUrl}/brands/admin`);
    }

    create(brand: Partial<Marca>): Observable<{ success: boolean; message: string }> {
        return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/brands`, brand);
    }

    update(id: number, brand: Partial<Marca>): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/brands/${id}`, brand);
    }

    delete(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/brands/${id}`);
    }
}
