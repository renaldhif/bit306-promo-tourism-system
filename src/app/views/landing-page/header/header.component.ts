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

    if (userId) {
      this.userService.getUserDetails(userId).subscribe({
        next: (data) => {
          this.userDetails = data;
          this.fullname = this.userDetails.fullname;
          this.initialName = this.fullname.split(' ').map((n: string) => n[0]).join('');
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

  updateInputValue() {
    this.inputValue = 'New Value';
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleCategoryMenu() {
    this.isCategoryMenuOpen = !this.isCategoryMenuOpen;
  }

  closeCategoryMenu() {
    this.isCategoryMenuOpen = false;
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
      }
    });
  }
}
