import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  passwordFieldType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  goToRegister() {
    // query params role customer
    this.router.navigate(['/register'], { queryParams: { role: 'customer' } });
  }

  buttonClicked = false;

  onSubmit() {
    this.buttonClicked = true;

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe({
        next: (data) => {
          // set token
          this.authService.setToken(data.token);
          // set role
          this.authService.setUserRole(data.role);
          // set user id
          this.authService.setUserId(data.userId);

          // simulate delay login through swal
          Swal.fire({
            title: 'Logging in...',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              //* Redirect based on role
              if (data.role === 'merchant') {
                this.router.navigate(['/merchant/dashboard']);
              } else if (data.role === 'admin') {
                this.router.navigate(['/admin/dashboard']);
              } else {
                this.router.navigate(['/']);
              }
            }
          });
        },
        error: (error) => {
          const errorMessage = error.error && error.error.message ? error.error.message : 'Login failed. Please try again.';
          Swal.fire({
            title: 'Login Failed',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
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
