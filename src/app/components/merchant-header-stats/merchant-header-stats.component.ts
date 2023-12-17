import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-header-stats',
  templateUrl: './merchant-header-stats.component.html',
  styleUrls: ['./merchant-header-stats.component.css']
})
export class MerchantHeaderStatsComponent {
  userDetails: any;
  name: string = 'Merchant ';
  isLoggedIn: boolean = this.authService.isLoggedIn();

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('User ID from header.component.ts: ' + userId);
    if (userId) {
      this.userService.getUserDetails(userId).subscribe({
        next: (data) => {
          console.log('====isLoggedIn MERCHANT===');
          console.log('Is logged in? ' + this.isLoggedIn);
          console.log('\n==============');
          this.userDetails = data;
          console.log('User details from MERCHANT merchant-header-stats.component.ts ' + JSON.stringify(this.userDetails, null, 2));
          console.log('==========');
          this.name = this.userDetails.fullname;
          console.log('Fullname from header.component.ts: ' + this.name);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  // logout
  logout = () => {
    Swal.fire({
      title: 'Logout',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4ade80',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        console.log('Logout executed from MERCHANT merchant-header-stats.component.ts');
        console.log('\n======');
        console.log('navigate to login');
        this.router.navigate(['/login']);
      }
    })
  }
}
