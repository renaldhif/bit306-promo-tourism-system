import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.registerForm = this.formBuilder.group({

      name: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword : ['', [Validators.required]],
      merchantDescription: [''],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Check if 'role' parameter is set to 'merchant'
      this.isMerchantSelected = params['role'] === 'merchant';
      this.isCustomerSelected = params['role'] === 'customer';

      // If 'role' parameter is 'merchant', update your form or perform any additional logic
      if (this.isMerchantSelected) {
        // Set your form values or perform any specific logic for merchant
        this.registerForm.patchValue({
          accountType: 'merchant', // Assuming 'accountType' is the control name in your form
        });
      }
      else{
        this.registerForm.patchValue({
          accountType: 'customer',
        });
      }
    });
  }

  isCustomerSelected: boolean = false;
  isMerchantSelected: boolean = false;
  selectedAccountType: string = '';
  passwordFieldType: string = 'password';
  repasswordFieldType: string = 'password';
  merchantDescription: string = '';

  // toggleCustomer() {
  //   this.isCustomerSelected = true;
  //   this.isMerchantSelected = false;
  //   this.selectedAccountType = 'customer';
  // }

  // toggleMerchant() {
  //   this.isCustomerSelected = false;
  //   this.isMerchantSelected = true;
  //   this.selectedAccountType = 'merchant';
  // }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleRepasswordVisibility() {
    this.repasswordFieldType = this.repasswordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    const inputValues = { ...this.registerForm.value };
    this.registerForm.get('accountType')?.setValue(this.selectedAccountType);
    if (this.registerForm.value.accountType === ''){
      this.registerForm.get('accountType')?.setValue('customer');
    }
    // inputValues.accountType = this.selectedAccountType;

    console.log('Register form values', inputValues);
    Swal.fire({
      title: 'Success!',
      text: `You have successfully registered!\n ${JSON.stringify(inputValues, null, 2)}`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }
}
