import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getFavorites(): Observable<{ success: boolean; data: any[] }> {
        return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}/favorites`);
    }

    addFavorite(producto_id: number): Observable<{ success: boolean; message: string }> {
        return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/favorites`, { producto_id });
    }

    removeFavorite(productId: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/favorites/${productId}`);
    }
}
