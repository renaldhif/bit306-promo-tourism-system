import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isCustomerSelected: boolean = false;
  isMerchantSelected: boolean = false;
  passwordFieldType: string = 'password';
  repasswordFieldType: string = 'password';

  toggleCustomer() {
    this.isCustomerSelected = true;
    this.isMerchantSelected = false;
  }

  toggleMerchant() {
    this.isCustomerSelected = false;
    this.isMerchantSelected = true;
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleRepasswordVisibility() {
    this.repasswordFieldType = this.repasswordFieldType === 'password' ? 'text' : 'password';
  }
}
