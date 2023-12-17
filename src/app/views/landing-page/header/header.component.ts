import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userDetails: any;
  fullname: string = '';
  initialName: string = '';
  isLoggedIn: boolean = this.authService.isLoggedIn();

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('User ID from header.component.ts: ' + userId);
    if (userId) {
      this.userService.getUserDetails(userId).subscribe({
        next: (data) => {
          console.log('====isLoggedIn===');
          console.log('Is logged in? ' + this.isLoggedIn);
          console.log('\n==============');
          this.userDetails = data;
          console.log('User details from header.component.ts: ' + JSON.stringify(this.userDetails, null, 2));
          console.log('==========');
          this.fullname = this.userDetails.fullname;
          console.log('Fullname from header.component.ts: ' + this.fullname);
          this.initialName = this.fullname.split(' ').map((n: string) => n[0]).join('');
          console.log('Initial name from header.component.ts: ' + this.initialName);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  // Temporary placeholder text
  inputPlaceholder: string = 'Search for best package deals';

  // Temporary input value
  inputValue: string = 'Bali';

  //toggle hamburger menu
  mobileMenuOpen:boolean = false;
  // toggle category menu
  isCategoryMenuOpen: boolean = false;

  // You can set the value dynamically based on your application logic
  // For example, in a method or an event handler
  updateInputValue() {
    this.inputValue = 'New Value';
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    console.log('kepencet gan. Valuenya: ' + this.mobileMenuOpen);
  }

  toggleCategoryMenu() {
    this.isCategoryMenuOpen = !this.isCategoryMenuOpen;
    console.log('toggleCateogry Masuk');
  }

  closeCategoryMenu() {
    this.isCategoryMenuOpen = false;
    console.log('closeCategory masuk gaaann');
  }

  logout() {
    this.authService.logout();
    console.log('Logout executed from header.component.ts');
    console.log('\n======');
    console.log('navigate to login');
    this.router.navigate(['/login']);
  }
}
