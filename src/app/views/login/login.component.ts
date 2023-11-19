import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  passwordFieldType: string = 'password';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  buttonClicked = false;

  onSubmit() {
    console.log('Login button pressed');
    console.log('apakah valid?' + this.loginForm.valid);

    this.buttonClicked = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Replace this with your actual form submission logic
      if (email === 'chandra@gmail.com' && password === 'password') {
        this.error = ''; // Clear any previous error message
        Swal.fire({
          title: 'Login Success',
          text: 'Welcome to the dashboard',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to the merchant dashboard [TEMPORARY!]
          this.router.navigate(['/merchant/dashboard'], { replaceUrl: true });
        });
      } else {
        this.error = 'Login failed. Invalid email or password.';
        console.log(this.error);
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid email or password',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      if (this.loginForm.get('email')?.hasError('required') || this.loginForm.get('password')?.hasError('required')) {
        this.error = 'Login failed. Please fill in all the required fields.';
        Swal.fire({
          title: 'Empty Fields',
          text: 'Please fill in all the required fields',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else if (this.loginForm.get('email')?.hasError('email')) {
        this.error = 'Login failed. Invalid email format.';
        Swal.fire({
          title: 'Invalid Email',
          text: 'Please enter a valid email address',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        // this.error = 'Login failed. Invalid email or password.';
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid email or password',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }




}
