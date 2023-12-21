import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MerchantService } from 'src/app/service/merchant.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  userRole: string = '';
  customerRegistrationForm: FormGroup;
  merchantRegistrationForm: FormGroup;
  error: string = '';
  showAdditionalFields: boolean = false;

  passwordFieldType: string = 'password';
  repasswordFieldType: string = 'password';

  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private authService: AuthService,
  ) {
    // Customer registration form
    this.customerRegistrationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', Validators.required],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      userRole: ['customer'],
    });

    // Merchant registration form
    this.merchantRegistrationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', Validators.required],
      userRole: ['merchant'],
      address: ['', Validators.required],
      merchantDescription: ['', Validators.required],
      document: [''],
      filename: [''],
      description: [''],
    });

  }

  ngOnInit(): void {
    // Retrieve the user's role from the route parameter
    this.route.queryParams.subscribe((params) => {
      console.log('Route params', params['role']);
      this.userRole = params['role']; // 'customer' or 'merchant'
      console.log('User role', this.userRole);
    });
  }

  get selectedForm() {
    return this.userRole === 'customer' ? this.customerRegistrationForm : this.merchantRegistrationForm;
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleRepasswordVisibility() {
    this.repasswordFieldType = this.repasswordFieldType === 'password' ? 'text' : 'password';
  }

  toggleAdditionalFields() {
    if (this.userRole === 'merchant') {
      if (
          this.selectedForm.get('fullname')?.valid
          && this.selectedForm.get('email')?.valid
          && this.selectedForm.get('phoneNum')?.valid
          && this.selectedForm.get('address')?.valid
          && this.selectedForm.get('merchantDescription')?.valid
        ){
        this.showAdditionalFields = !this.showAdditionalFields;
        if (this.showAdditionalFields) {
          this.merchantRegistrationForm.get('document')?.setValidators([Validators.required]);
          this.merchantRegistrationForm.get('filename')?.setValidators([Validators.required]);
          this.merchantRegistrationForm.get('description')?.setValidators([Validators.required]);
        }
      }
      else {
        if (
          this.selectedForm.get('fullname')?.hasError('required')
          || this.selectedForm.get('email')?.hasError('required')
          || this.selectedForm.get('phoneNum')?.hasError('required')
          || this.selectedForm.get('address')?.hasError('required')
          || this.selectedForm.get('merchantDescription')?.hasError('required')) {
          this.error = 'Registration failed. Please fill in all the required fields for the merchant.';
          Swal.fire({
            title: 'Empty Fields',
            text: 'Please fill in all the required fields for the merchant',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else if (this.selectedForm.get('email')?.hasError('email')) {
          this.error = 'Registration failed. Invalid email format for the merchant.';
          Swal.fire({
            title: 'Invalid Email',
            text: 'Please enter a valid email address for the merchant',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
        else {
          this.error = 'Registration failed. Please check your inputs for the merchant.';
          Swal.fire({
            title: 'Registration Failed',
            text: 'Please check your inputs for the merchant',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];

      // handle accept pdf only
      if (this.selectedFile.type !== 'application/pdf') {
        Swal.fire({
          title: 'Invalid File Type',
          text: 'Please upload a PDF file',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        // Reset the file input
        // input.value = '';
        // this.selectedFile = null;
      }
      else {
        console.log('file is pdf. with original file name is: ' + this.selectedFile.name);
        this.merchantRegistrationForm.patchValue({ filename: this.selectedFile.name });
      }
    }
  }

  registerMerchant() {
    console.log('Register button pressed');
    console.log('Is the form valid?' + this.selectedForm.valid);

    if (this.selectedForm.valid) {
      const inputValues = { ...this.selectedForm.value };

      if (this.userRole === 'merchant' && this.selectedFile) {
        // Create FormData object
        const formData = new FormData();
        formData.append('document', this.selectedFile);

        Object.keys(this.merchantRegistrationForm.controls).forEach(key => {
          const control = this.merchantRegistrationForm.get(key);
          if (control && key !== 'document') {
            formData.append(key, control.value);
          }
        });

        const email = this.selectedForm.value.email;
        console.log('email is: ' + email);
        this.authService.isEmailTaken(email).subscribe((response) => {
          console.log('valiadtion email taken from merchant');
          console.log('Response this.authService.isEmailTaken', response);
          if (response.isEmailTaken) {
            Swal.fire({
              title: 'Email Exists',
              text: 'Email already exists',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
          else {
            // Call the service with FormData
            this.merchantService.registerMerchant(formData).subscribe((response: any) => {
              console.log('Response this.merchantService.registerMerchant', response);
              // Swal message for merchant
              Swal.fire({
                title: 'Merchant Account Successfully Created!',
                text: 'Please check your email to see your password to be able to login to our system. Please remember that you have to change your password upon your first login!',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/login']);
                }
              });
            });
          }
        });
      }
    }
    else {
      console.log('Register Merchant fields are not valid');

      // Handle merchant form validation errors
      if (this.selectedForm.get('fullname')?.hasError('required')
        || this.selectedForm.get('email')?.hasError('required')
        || this.selectedForm.get('phoneNum')?.hasError('required')
        || this.selectedForm.get('address')?.hasError('required')
        || this.selectedForm.get('merchantDescription')?.hasError('required')
        || this.selectedForm.get('document')?.hasError('required')
        || this.selectedForm.get('filename')?.hasError('required')
        || this.selectedForm.get('description')?.hasError('required')) {
        this.error = 'Registration failed. Please fill in all the required fields for the merchant.';
        Swal.fire({
          title: 'Empty Fields',
          text: 'Please fill in all the required fields for the merchant',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else if (this.selectedForm.get('email')?.hasError('email')) {
        this.error = 'Registration failed. Invalid email format for the merchant.';
        Swal.fire({
          title: 'Invalid Email',
          text: 'Please enter a valid email address for the merchant',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      else {
        this.error = 'Registration failed. Please check your inputs for the merchant.';
        Swal.fire({
          title: 'Registration Failed',
          text: 'Please check your inputs for the merchant',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  }

  registerCustomer() {
    console.log('RegisterCustomer BEGINS');
    console.log('Is the form valid?' + this.selectedForm.valid);
    console.log('customerRegistrationForm is: ' + this.customerRegistrationForm);
    console.log('customerRegistrationForm isValid?: ' + this.customerRegistrationForm.valid);

    if (this.userRole === 'customer' && this.customerRegistrationForm.valid) {
      const customerData = { ...this.customerRegistrationForm.value };
      console.log('customerData is: ' + customerData);

      // Check if the email already exists
      const email = this.selectedForm.value.email;
      console.log('email is: ' + email);
      this.authService.isEmailTaken(email).subscribe((response) => {
        console.log('valiadtion email taken from customer');
        console.log('Response this.authService.isEmailTaken', response);
        if (response.isEmailTaken) {
          Swal.fire({
            title: 'Email Exists',
            text: 'Email already exists',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
        else {
          console.log('Registering for customer...');
          this.authService.register(customerData).subscribe((response: any) => {
            console.log('Response this.authService.register', response);
            Swal.fire({
              title: 'Success!',
              text: 'Your account has been created successfully.\nWelcome to Promo Tourism!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/login']);
              }
            });
          });
        }
      });
    }
    else {
      // Handle customer form validation errors
      if (this.selectedForm.get('fullname')?.hasError('required')
        || this.selectedForm.get('email')?.hasError('required')
        || this.selectedForm.get('phoneNum')?.hasError('required')
        || this.selectedForm.get('password')?.hasError('required')
        || this.selectedForm.get('repassword')?.hasError('required')) {
        this.error = 'Registration failed. Please fill in all the required fields for the customer.';
        Swal.fire({
          title: 'Empty Fields',
          text: 'Please fill in all the required fields for the customer',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else if (this.selectedForm.get('email')?.hasError('email')) {
        this.error = 'Registration failed. Invalid email format for the customer.';
        Swal.fire({
          title: 'Invalid Email',
          text: 'Please enter a valid email address for the customer',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else if (this.selectedForm.get('password')?.value !== this.selectedForm.get('repassword')?.value) {
        this.error = 'Registration failed. Passwords do not match for the customer.';
        Swal.fire({
          title: 'Password Mismatch',
          text: 'Passwords do not match for the customer',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        this.error = 'Registration failed. Please check your inputs for the customer.';
        Swal.fire({
          title: 'Registration Failed',
          text: 'Please check your inputs for the customer',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  }

  onSubmit() {
    console.log('Register button pressed');
    this.userRole === 'merchant' ? this.registerMerchant() : this.registerCustomer();
  }
}
