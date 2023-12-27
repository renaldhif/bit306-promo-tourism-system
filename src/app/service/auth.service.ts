import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Dev
import { environment } from '../../../env/dev.environtment';
// Prod
// import { environment } from '../../../env/prod.environtment';
import { jwtDecode } from "jwt-decode";

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

  // check whether the user isAuthenticated and token is not expired
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationDate = decodedToken.exp;
      const isExpired = expirationDate !== undefined && Date.now() >= expirationDate * 1000;

      return !isExpired;
    }
    return false;
  }

  // check whether the admin isAuthenticated and token is not expired
  isAdminAuthenticated(): boolean {
    if (this.isAuthenticated()) {
      const role = this.getRole();
      return role === 'admin';
    }
    return false;
  }

  // check whether the merchant isAuthenticated and token is not expired
  isMerchantAuthenticated(): boolean {
    if (this.isAuthenticated()) {
      const role = this.getRole();
      return role === 'merchant';
    }
    return false;
  }
}
