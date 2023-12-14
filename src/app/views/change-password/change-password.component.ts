import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../app/service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  passwordFieldType: string = 'password';
  repasswordFieldType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleRePasswordVisibility() {
    this.repasswordFieldType = this.repasswordFieldType === 'password' ? 'text' : 'password';
  }

  buttonClicked = false;

  onSubmit() {
    console.log('On Submit clicked');

    if (this.changePasswordForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the required fields!',
      });
    }

    if (this.changePasswordForm.value.password !== this.changePasswordForm.value.repassword) {
      // Handle password mismatch here
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password mismatch!',
      });
      return;
    }

    if (this.changePasswordForm.valid) {
      const email = this.changePasswordForm.value.email;
      const newPassword = this.changePasswordForm.value.password;

      this.authService.resetPassword(email, newPassword).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Change Password Success',
            text: 'Your password has been changed',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/merchant/dashboard'], { replaceUrl: true });
          });
        },
        error: (error) => {
          // Handle the error response here
          Swal.fire({
            icon: 'error',
            title: 'Failed to Change Password',
            text: 'There was an issue changing your password. Please try again.'
          });
        }
      });
    }
  }
}
