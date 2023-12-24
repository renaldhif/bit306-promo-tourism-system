import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../app/service/auth.service';
import { UserService } from '../../../app/service/user.service';
import { AdminService } from '../../../app/service/admin.service';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.css']
})
export class HeaderStatsComponent {

  userDetails: any;
  name: string = 'Tourism Ministry Officer';
  isLoggedIn: boolean = this.authService.isLoggedIn();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private AdminService: AdminService,
    ) {}

  merchantTotal: string = '0';
  verifiedMerchantTotal: string = '0';
  pendingMerchantTotal: string = '0';
  rejectedMerchantTotal: string = '0';

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('User ID from header-stats.component.ts: ' + userId);
    if (userId) {
      this.userService.getUserDetails(userId).subscribe({
        next: (data) => {
          console.log('====isLoggedIn ADMIN OFFICER===');
          console.log('Is logged in? ' + this.isLoggedIn);
          console.log('\n==============');
          this.userDetails = data;
          console.log('User details from ADMIN OFFICER header-stats.component.ts ' + JSON.stringify(this.userDetails, null, 2));
          console.log('==========');
          this.name = this.userDetails.fullname;
          console.log('Fullname from ADMIN OFFICER header-stats.component.ts: ' + this.name);
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.AdminService.getAllMerchantCount().subscribe({
        next: (data: any) => {
          console.log('data: ' + JSON.stringify(data, null, 2));

          // set data merchants
          this.merchantTotal = data.merchants.toString();
          this.verifiedMerchantTotal = data.verifiedMerchants.toString();
          this.pendingMerchantTotal = data.pendingMerchants.toString();
          this.rejectedMerchantTotal = data.rejectedMerchants.toString();
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
        console.log('Logout executed from ADMIN OFFICER header-stats.component.ts');
        console.log('\n======');
        console.log('navigate to login');
        this.router.navigate(['/login']);
      }
    })
  }
}
