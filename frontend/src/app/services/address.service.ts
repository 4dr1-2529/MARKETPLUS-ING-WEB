import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Direccion } from '../models/address.model';

@Injectable({ providedIn: 'root' })
export class AddressService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAll(): Observable<{ success: boolean; data: Direccion[] }> {
        return this.http.get<{ success: boolean; data: Direccion[] }>(`${this.apiUrl}/addresses`);
    }

    getById(id: number): Observable<{ success: boolean; data: Direccion }> {
        return this.http.get<{ success: boolean; data: Direccion }>(`${this.apiUrl}/addresses/${id}`);
    }

    create(address: Partial<Direccion>): Observable<{ success: boolean; message: string; data: Direccion }> {
        return this.http.post<{ success: boolean; message: string; data: Direccion }>(`${this.apiUrl}/addresses`, address);
    }

    update(id: number, address: Partial<Direccion>): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/addresses/${id}`, address);
    }

    delete(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/addresses/${id}`);
    }

    setPrimary(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/addresses/${id}/primary`, {});
    }
}
