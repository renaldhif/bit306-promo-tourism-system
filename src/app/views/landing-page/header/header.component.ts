import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

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
}
