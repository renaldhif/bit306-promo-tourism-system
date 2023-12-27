import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MerchantGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'merchant') {
      if (this.authService.isMerchantAuthenticated()) { // Check if user is authenticated
        return true;
      } else {
        this.router.navigate(['/login']); // Redirect to login page if not authenticated
        return false;
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not authorized to access this page!'
      })
      this.router.navigate(['/']);
      return false;
    }
  }
}
