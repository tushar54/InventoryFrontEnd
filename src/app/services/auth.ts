import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://inventorybackend-9b01.onrender.com/api/auth'; // replace with your backend URL

  constructor(private http: HttpClient) {}

  // ✅ Register user
  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // ✅ Login user
  login(data: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  // ✅ Save JWT token
  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  // ✅ Get token
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem('jwt_token');
  }
}
