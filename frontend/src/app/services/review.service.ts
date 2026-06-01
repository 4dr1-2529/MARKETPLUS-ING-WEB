import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Valoracion } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getByProduct(productId: number): Observable<{ success: boolean; data: Valoracion[] }> {
        return this.http.get<{ success: boolean; data: Valoracion[] }>(`${this.apiUrl}/reviews/product/${productId}`);
    }

    create(review: Partial<Valoracion>): Observable<{ success: boolean; message: string; data: Valoracion }> {
        return this.http.post<{ success: boolean; message: string; data: Valoracion }>(`${this.apiUrl}/reviews`, review);
    }

    update(id: number, review: Partial<Valoracion>): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/reviews/${id}`, review);
    }

    delete(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/reviews/${id}`);
    }

    getUserReview(productId: number): Observable<{ success: boolean; data: Valoracion | null }> {
        return this.http.get<{ success: boolean; data: Valoracion | null }>(`${this.apiUrl}/reviews/my-review/${productId}`);
    }
}
