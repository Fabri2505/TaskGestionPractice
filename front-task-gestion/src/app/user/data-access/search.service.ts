import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UsuarioApiResponse } from '../utils/schemas';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:8000/api/users'
  private http = inject(HttpClient);

  constructor() { }

  searchUsers(filtro: string, tipo_busqueda : string): Observable<UsuarioApiResponse[]> {

    const params = new HttpParams()
      .set('filtro', filtro)
      .set('tipo_busqueda', tipo_busqueda);

    return this.http.get<UsuarioApiResponse[]>(`${this.baseUrl}/search`, { 
      params 
    }).pipe(
      catchError((error) => {
        console.error('Error fetching search results:', error);
        return throwError(() => new Error('Error fetching search results'));
      })
    );

  }
}
