import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// Dev
import { environment } from "../../../env/dev.environtment";
// Prod
// import { environment } from '../../../env/prod.environtment';
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserDetails(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/api/user/${userId}`, { headers });
  }

  // New method without authentication
  getUserDetailsWithoutAuth(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/user/public/${userId}`);
  }

}
