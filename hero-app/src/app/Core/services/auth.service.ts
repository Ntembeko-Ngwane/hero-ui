import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser, LoginUser } from '../../Models/auth';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:5123/api/auth';

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post<{ token: string; role: string; message: string }>(`${this.apiUrl}/login`, data)
     .pipe(
        tap(res => {
          this.saveToken(res.token);
          this.saveRole(res.role);
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveRole(role: string) {
    localStorage.setItem('role', role);
  }


  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

