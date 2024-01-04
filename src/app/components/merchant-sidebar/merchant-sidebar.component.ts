import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-sidebar',
  templateUrl: './merchant-sidebar.component.html',
  styleUrls: ['./merchant-sidebar.component.css']
})
export class MerchantSidebarComponent {

  constructor(private router: Router) {}

  // collapseShow = false; // Initial state
  collapseShow = "hidden";
  isMobileNavOpen = false;

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  goToPage(path: string){
    this.router.navigate([path]);
  }
}
