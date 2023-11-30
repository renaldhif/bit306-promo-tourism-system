import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  passwordFieldType: string = 'password';
  repasswordFieldType: string = 'password';

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
      Swal.fire({
        title: 'Change Password Success',
        text: 'Your password has been changed',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to the merchant dashboard [TEMPORARY!]
        this.router.navigate(['/merchant/dashboard'], { replaceUrl: true });
      });
    }
  }
}
