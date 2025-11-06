import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ChangePasswordRequest } from '../utils/schemas';
import { BasicResponseApi } from '../../core/schemas';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl = 'http://localhost:8000/api/users';
  private http = inject(HttpClient);

  constructor() { }

  changePassword(data:ChangePasswordRequest):Observable<BasicResponseApi> {
    const { userId, ...passwordData } = data;

    return this.http.put<BasicResponseApi>(
      `${this.baseUrl}/change-password/${userId}`, 
      passwordData
    ).pipe(
      catchError((error) => {
        console.error('Error changing password:', error);
        throw error;
      })
    );
  }
}
