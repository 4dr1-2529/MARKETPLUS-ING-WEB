import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Notificacion } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAll(): Observable<{ success: boolean; data: Notificacion[] }> {
        return this.http.get<{ success: boolean; data: Notificacion[] }>(`${this.apiUrl}/notifications`);
    }

    getUnreadCount(): Observable<{ success: boolean; data: { count: number } }> {
        return this.http.get<{ success: boolean; data: { count: number } }>(`${this.apiUrl}/notifications/unread-count`);
    }

    markAsRead(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/notifications/${id}/read`, {});
    }

    markAllAsRead(): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/notifications/read-all`, {});
    }

    delete(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/notifications/${id}`);
    }
}
