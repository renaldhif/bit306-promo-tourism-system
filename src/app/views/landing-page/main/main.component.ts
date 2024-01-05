import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'env/dev.environtment';
import { ProductService } from 'src/app/service/product.service';

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
  isLoading = false;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getTop5ProductsBySoldQty().subscribe(
      (products: any[]) => {
        this.productList = products;
        this.isLoading = false;
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
    this.productService.getProductById(productID).subscribe(
      (productDetails: any) => {
        // Navigate to the product detail page with the fetched product details
        this.router.navigate(['/product', productID], { state: { product: productDetails } });
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  goToAllProducts() {
    this.router.navigate(['/all-products']);
  }

  checkOutNow(productID: number) {
    // Navigate to the checkout page with the product ID
    this.router.navigate(['/customer/checkout', productID]);
  }
}
