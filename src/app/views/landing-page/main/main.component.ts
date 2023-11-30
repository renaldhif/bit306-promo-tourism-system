import { Component, OnInit, HostListener } from '@angular/core';;
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/service/product-service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  currentProductIndex = 0;
  productList: any[] = [];
  scrollTimeout: any;
  buttonClicked = false;

  constructor(private router:Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.productList = this.productService.getAllProducts();

    // timeout 3s for scrolling if user hasnt clicked on button
    setTimeout(() => {
      if (!this.buttonClicked) {
        this.scrollToProducts();
      }
    }, 3000);
  }

  scrollToProducts() {
    this.buttonClicked = true;
    const productSection = document.getElementById('productSection');

      if (productSection) {
        const offset = 0; //offset height of header
        const topPosition = productSection.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: topPosition + offset,
            behavior: 'smooth',
          });
      }
  }

  cancelScrollTimeout() {
    clearTimeout(this.scrollTimeout);
  }

  scrollCarousel(direction: number) {
    const container = document.querySelector('.overflow-x-auto');
    if (container) {
      container.scrollBy({
        left: direction * 300, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  }

  goToProductDetail (productID: number) {
    this.router.navigate(['/product', productID]);
  }

  checkOutNow (productID: number) {
    this.router.navigate(['/customer/checkout', productID]);
  }

}
