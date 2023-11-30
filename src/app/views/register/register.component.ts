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
  userRole: string = '';
  customerRegistrationForm: FormGroup;
  merchantRegistrationForm: FormGroup;
  error: string = '';
  showAdditionalFields: boolean = false;

  dummyUsers = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' },
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    // Customer registration form
    this.customerRegistrationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', Validators.required],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
    });

    // Merchant registration form
    this.merchantRegistrationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', Validators.required],
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

  passwordFieldType: string = 'password';
  repasswordFieldType: string = 'password';


  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleRepasswordVisibility() {
    this.repasswordFieldType = this.repasswordFieldType === 'password' ? 'text' : 'password';
  }

  toggleAdditionalFields() {
    if(this.userRole === 'merchant'){
      if(this.selectedForm.get('fullname')?.valid && this.selectedForm.get('email')?.valid && this.selectedForm.get('phoneNum')?.valid && this.selectedForm.get('merchantDescription')?.valid){
        this.showAdditionalFields = !this.showAdditionalFields;
        if(this.showAdditionalFields){
          this.merchantRegistrationForm.get('document')?.setValidators([Validators.required]);
          this.merchantRegistrationForm.get('filename')?.setValidators([Validators.required]);
          this.merchantRegistrationForm.get('description')?.setValidators([Validators.required]);
        }
      }
      else{
        if (this.selectedForm.get('fullname')?.hasError('required') || this.selectedForm.get('email')?.hasError('required') || this.selectedForm.get('phoneNum')?.hasError('required') || this.selectedForm.get('merchantDescription')?.hasError('required')) {
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



  onSubmit() {
    console.log('Register button pressed');
    console.log('Is the form valid?' + this.selectedForm.valid);

    if (this.selectedForm.valid) {
      const inputValues = { ...this.selectedForm.value };

      // Check if email already exists
      const isEmailExists = this.dummyUsers.some((user) => user.email === this.selectedForm.value.email);
      if (isEmailExists) {
        this.error = 'Registration failed. Email already exists.';
        Swal.fire({
          title: 'Email Exists',
          text: 'Email already exists',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }

      console.log('Register form values', inputValues);
      Swal.fire({
        title: 'Success!',
        text: `You have successfully registered with data DEBUG!\n ${JSON.stringify(inputValues, null, 2)}`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    } else {
      // Handle validation errors based on the selected form
      if (this.userRole === 'customer') {
        // Handle customer form validation errors
        if (this.selectedForm.get('fullname')?.hasError('required') || this.selectedForm.get('email')?.hasError('required') || this.selectedForm.get('phoneNum')?.hasError('required') || this.selectedForm.get('password')?.hasError('required') || this.selectedForm.get('repassword')?.hasError('required')) {
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
      } else if (this.userRole === 'merchant') {
        // Handle merchant form validation errors
        if (this.selectedForm.get('fullname')?.hasError('required') || this.selectedForm.get('email')?.hasError('required') || this.selectedForm.get('phoneNum')?.hasError('required') || this.selectedForm.get('merchantDescription')?.hasError('required')
            || this.selectedForm.get('document')?.hasError('required') || this.selectedForm.get('filename')?.hasError('required') || this.selectedForm.get('description')?.hasError('required')) {
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

}
