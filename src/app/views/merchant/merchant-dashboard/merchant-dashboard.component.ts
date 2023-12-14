import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css']
})
export class MerchantDashboardComponent {

  isChangePassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('User ID from merchant-dashboard.component.ts: ' + userId);
    if (userId) {
      this.userService.getUserDetails(userId).subscribe({
        next: (data) => {
          console.log('====isLoggedIn MERCHANT===');
          console.log('Is logged in? ' + this.authService.isLoggedIn());
          console.log('\n==============');
          console.log('User details from MERCHANT merchant-dashboard.component.ts ' + JSON.stringify(data, null, 2));
          console.log('==========');
          console.log('isMerchantChangePassword API value: ' + data.isMerchantChangedPassword);
          this.isChangePassword = data.isMerchantChangedPassword;
          console.log('isChangePassword now value: ' + this.isChangePassword);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }


}
