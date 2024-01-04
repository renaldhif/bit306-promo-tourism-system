import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuantityService } from 'src/app/service/quantity.service';
import { ReviewService } from 'src/app/service/review.service';
import { environment } from 'env/dev.environtment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  productId: string | null;
  product: any;
  quantity: number = 1;
  pricePerItem: number = 0;
  destinationsKeys: string[] = [];
  reviews: any[] = [];
  includes: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private quantityService: QuantityService,
    private reviewService: ReviewService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam;
  }

  ngOnInit(): void {
    if (this.productId !== null) {
      this.productService.getProductById(this.productId).subscribe(
        (product) => {
          this.product = product;
          this.pricePerItem = product.price;
          this.destinationsKeys = Object.keys(this.product.destinations);

          // Fetch reviews using getReviewDetail from ReviewService
          this.reviews = [];
          product.reviews.forEach((reviewId: string) => {
            this.reviewService.getReviewDetail(reviewId).subscribe(
              (review) => {
                this.reviews.push(review);
              },
              (error) => {
                console.error('Error fetching review details:', error);
              }
            );
          });

          this.includes = Object.values(this.product.includes);
        },
        (error) => {
          console.error('Error fetching product details:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
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

  // Calculate the total price based on quantity and price per item
  get total(): number {
    return this.quantity * this.pricePerItem;
  }

  // Increase the quantity
  incrementQuantity() {
    // limit to 99
    if (this.quantity < 99) {
      this.quantity++;
    }
  }

  // Decrease the quantity, but ensure it doesn't go below 1
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  checkoutNow(productID: string) {
    // Use the QuantityService to set the quantity
    this.quantityService.setQuantity(this.quantity);

    // Navigate to /customer/checkout/{productID} without using query parameters
    this.router.navigate(['/customer/checkout', productID]);
  }
}



