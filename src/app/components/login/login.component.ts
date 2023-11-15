import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  buttonClicked = false;

  onSubmit() {
    this.buttonClicked = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Replace this with your actual form submission logic
      if (email === 'chandra@gmail.com' && password === 'password') {
        this.error = ''; // Clear any previous error message
        console.log('Login successful!'); // You can redirect to another page or perform other actions here
      } else {
        this.error = 'Login failed. Invalid email or password.';
        console.log(this.error); // Log the error message
      }
    } else {
      this.error = 'Login failed. Invalid email or password.';
    }
  }



}
