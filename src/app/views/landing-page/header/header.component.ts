import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userDetails: any;
  fullname: string = '';
  initialName: string = '';
  // isLoggedIn: boolean = this.authService.isLoggedIn();
  // * Changed to isAuthenticated() to check whether the token is expired or not
  isLoggedIn: boolean = this.authService.isAuthenticated();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.querySelector('#' + fragment);
        if (element) element.scrollIntoView();
      }
    });
  }
  // Temporary placeholder text
  inputPlaceholder: string = 'Search for best package deals';

  // Temporary input value
  inputValue: string = 'Bali';

  //toggle hamburger menu
  mobileMenuOpen:boolean = false;
  // toggle category menu
  isCategoryMenuOpen: boolean = false;

  navigateTo(sectionId: string) {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.querySelector('#' + sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    });
  }

  // smoothScroll(){
  //   const productSection = document.getElementById('why-choose-us');

  //   if (productSection) {
  //     const offset = 0; // Offset height of the header
  //     const topPosition = productSection.getBoundingClientRect().top + window.scrollY;
  //     window.scrollTo({
  //       top: topPosition + offset,
  //       behavior: 'smooth',
  //     });
  //   }
  // }

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
    // simulate delay in logout through swal
    Swal.fire({
      title: 'Logging out...',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
        this.authService.logout();
        this.router.navigate(['/login']);
        console.log('Logout executed from header.component.ts');
        console.log('\n======');
        console.log('navigate to login');
      }
    });
  }
}
