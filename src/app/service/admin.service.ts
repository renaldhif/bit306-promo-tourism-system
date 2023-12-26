import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Dev
import { environment } from '../../../env/dev.environtment';
import { Observable } from 'rxjs/internal/Observable';
// Prod
// import { environment } from '../../../env/prod.environtment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllMerchants = () => {
    return this.http.get(`${this.apiUrl}/api/admin/merchant-list`);
  }

  getMerchantDetail = (merchantID: string) => {
    return this.http.get(`${this.apiUrl}/api/admin/merchant/${merchantID}`);
  }

  verifyMerchant = (merchantID: string) => {
    return this.http.put(`${this.apiUrl}/api/admin/merchant/verify/${merchantID}`, {})
  }

  rejectMerchant = (merchantID: string) => {
    return this.http.put(`${this.apiUrl}/api/admin/merchant/reject/${merchantID}`, {})
  }

  //* DASHBOARD

  // All Merchants
  getAllMerchantCount = () => {
    return this.http.get(`${this.apiUrl}/api/admin/merchant/count/all`);
  }

  // * ANALYTICS
  getMerchantsByMonth(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/admin/analytics/merchants-by-month/${year}`);
  }

  getCustomersByMonth(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/admin/analytics/customers-by-month/${year}`);
  }

  // // Verified Merchants count
  // getVerifiedMerchantCount = () => {
  //   return this.http.get(`${this.apiUrl}/api/merchant/count/verified`);
  // }

  // // Pending Merchants count
  // getPendingMerchantCount = () => {
  //   return this.http.get(`${this.apiUrl}/api/merchant/count/pending`);
  // }

  // // Rejected Merchants count
  // getRejectedMerchantCount = () => {
  //   return this.http.get(`${this.apiUrl}/api/merchant/count/rejected`);
  // }
}
