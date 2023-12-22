import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Dev
import { environment } from '../../../env/dev.environtment';
// Prod
// import { environment } from '../../../env/prod.environtment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(formData: FormData) {
    return this.http.post(`${this.apiUrl}/api/auth/register`, formData);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, { email, password });
  }
  // Function to store JWT in local storage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  // Function to store user role in local storage
  setUserRole(role: string): void {
    localStorage.setItem('role', role);
  }

  // Function to retrieve JWT from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Function to log out the user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  // reset password
  resetPassword(email: string, newPassword: string) {
    return this.http.post<any>(`${this.apiUrl}/api/auth/reset-password`, { email, newPassword });
  }

  // check email
  isEmailTaken(email: string) {
    return this.http.get<any>(`${this.apiUrl}/api/auth/check-email/${email}`);
  }
}
