import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Dev
import { environment } from '../../../env/dev.environtment';
// Prod
// import { environment } from '../../../env/prod.environtment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerMerchant(formData: FormData) {
    return this.http.post(`${this.apiUrl}/api/merchant/register`, formData);
  }
}
