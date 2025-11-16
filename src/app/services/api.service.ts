import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
   private baseUrl = 'https://carxapi.galaxydev.pk/api';
//  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Retrieve the auth token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Create the authorization headers
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // ---------------------------
  // Universal CRUD Methods
  // ---------------------------

  // GET request
  get<T>(endpoint: string, params: any = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  // POST request
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getAuthHeaders(),
    });
  }

  // PUT request
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getAuthHeaders(),
    });
  }

  // PATCH request
  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getAuthHeaders(),
    });
  }

  // DELETE request with optional body
  delete<T>(endpoint: string, body?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getAuthHeaders(),
      body: body, // <-- Pass body here
    });
  }
}
