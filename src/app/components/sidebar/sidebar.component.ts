import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) {}

  // collapseShow = false; // Initial state
  collapseShow = "hidden";
  isMobileNavOpen = false;

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  // toggleMobileNav() {
  //   console.log('CURRENT collape show: ' + this.collapseShow);
  //   this.collapseShow = !this.collapseShow;
  //   console.log('UPDATED collape show: ' + this.collapseShow);
  //   this.isMobileNavOpen = !this.isMobileNavOpen;
  // }

  goToPage(path: string){
    this.router.navigate([path]);
  }
}
