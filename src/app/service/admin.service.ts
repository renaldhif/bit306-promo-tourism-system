import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Dev
import { environment } from '../../../env/dev.environtment';
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

  getMerchantDetail = (merchantID: number) => {
    return this.http.get(`${this.apiUrl}/api/admin/merchant-detail/${merchantID}`);
  }

  verifyMerchant = (merchantID: number) => {
    return this.http.put(`${this.apiUrl}/api/admin/merchant/verify/${merchantID}`, {})
  }

  rejectMerchant = (merchantID: number) => {
    return this.http.put(`${this.apiUrl}/api/admin/merchant/reject/${merchantID}`, {})
  }

  //* DASHBOARD

  // All Merchants
  getAllMerchantCount = () => {
    return this.http.get(`${this.apiUrl}/api/admin/merchant/count/all`);
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
