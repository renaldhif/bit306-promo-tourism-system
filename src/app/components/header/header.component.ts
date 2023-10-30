import { Component, NgModule } from '@angular/core';

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

  // You can set the value dynamically based on your application logic
  // For example, in a method or an event handler
  updateInputValue() {
    this.inputValue = 'New Value';
  }
}
