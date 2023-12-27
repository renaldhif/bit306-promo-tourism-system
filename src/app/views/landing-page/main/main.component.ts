// import { Component, OnInit, HostListener } from '@angular/core';;
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { ProductService } from 'src/app/service/product-service'

// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.css']
// })
// export class MainComponent {
//   currentProductIndex = 0;
//   productList: any[] = [];
//   scrollTimeout: any;
//   buttonClicked = false;

//   constructor(private router:Router, private productService: ProductService) {}

//   ngOnInit(): void {
//     this.productService.getAllProducts().subscribe(
//       (products: any[]) => {
//         this.productList = products;
  
//         // timeout 3s for scrolling if the user hasn't clicked on the button
//         setTimeout(() => {
//           if (!this.buttonClicked) {
//             this.scrollToProducts();
//           }
//         }, 3000);
//       },
//       error => {
//         console.error('Error fetching products:', error);
//         // Handle the error, e.g., show an error message to the user
//       }
//     );
//   }
  
//   scrollToProducts() {
//     this.buttonClicked = true;
//     const productSection = document.getElementById('productSection');

//       if (productSection) {
//         const offset = 0; //offset height of header
//         const topPosition = productSection.getBoundingClientRect().top + window.scrollY;
//           window.scrollTo({
//             top: topPosition + offset,
//             behavior: 'smooth',
//           });
//       }
//   }

//   cancelScrollTimeout() {
//     clearTimeout(this.scrollTimeout);
//   }

//   scrollCarousel(direction: number) {
//     const container = document.querySelector('.overflow-x-auto');
//     if (container) {
//       container.scrollBy({
//         left: direction * 300, // Adjust the scroll distance as needed
//         behavior: 'smooth',
//       });
//     }
//   }

//   goToProductDetail (productID: number) {
//     this.router.navigate(['/product', productID]);
//   }

//   checkOutNow (productID: number) {
//     this.router.navigate(['/customer/checkout', productID]);
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'env/dev.environtment';
import { ProductService } from 'src/app/service/product-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentProductIndex = 0;
  productList: any[] = [];
  scrollTimeout: any;
  buttonClicked = false;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products: any[]) => {
        this.productList = products;

        // Timeout 3s for scrolling if the user hasn't clicked on the button
        setTimeout(() => {
          if (!this.buttonClicked) {
            this.scrollToProducts();
          }
        }, 3000);
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }

  getProductImageURL(imagePath: string | undefined): string {
    if (!imagePath) {
      // Handle the case where imagePath is undefined
      return ''; // or a default image URL
    }

    // Check if the imagePath is an absolute URL (starts with "http" or "/")
    if (imagePath.startsWith('http')) {
      return imagePath; // It's already an absolute URL
    } else {
      // Assuming there is a base URL for your images
      const baseURL = environment.apiUrl;
      return baseURL + imagePath;
    }
  }

  scrollToProducts() {
    this.buttonClicked = true;
    const productSection = document.getElementById('productSection');

    if (productSection) {
      const offset = 0; // Offset height of the header
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

  goToProductDetail(productID: string) {
    // Fetch the product details by ID
    console.log('product list' + JSON.stringify(this.productList));
    console.log('productID: ' + productID);
    this.productService.getProductById(productID).subscribe(
      (productDetails: any) => {
        // Navigate to the product detail page with the fetched product details
        this.router.navigate(['/product', productID], { state: { product: productDetails } });
      },
      (error) => {
        console.error('Error fetching product details:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }

  checkOutNow(productID: number) {
    // Navigate to the checkout page with the product ID
    this.router.navigate(['/customer/checkout', productID]);
  }
}
