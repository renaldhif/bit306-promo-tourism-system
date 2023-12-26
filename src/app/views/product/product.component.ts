import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuantityService } from 'src/app/service/quantity.service';
import { ReviewService } from 'src/app/service/review.service';
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
    console.log(idParam);
    // this.productId = idParam ? parseInt(idParam, 10) : null;
    this.productId = idParam;

    // this.quantity = this.quantityService.getQuantity();
    console.log('this product id' + this.productId);

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
          console.log('product review' + JSON.stringify(product.reviews));
          product.reviews.forEach((reviewId: string) => {
            this.reviewService.getReviewDetail(reviewId).subscribe(
              (review) => {
                console.log('review' + JSON.stringify(review));
                this.reviews.push(review);
                console.log('this review' + JSON.stringify(this.reviews));
                console.log('this review' + this.reviews[0].rating);
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

  // checkoutNow(productID: string) {
  //   // might not appropriate to use query parameters here to pass the quantity
  //   // later we will use a service or state management to store the quantity
  //   const queryParams = {
  //     quantity: this.quantity,
  //   };

  //   // Navigate to /customer/checkout/{productID} with query parameters
  //   this.router.navigate(['/customer/checkout', productID], {
  //     queryParams,
  //   });
  // }

  checkoutNow(productID: string) {
    // Use the QuantityService to set the quantity
    this.quantityService.setQuantity(this.quantity);

    // Navigate to /customer/checkout/{productID} without using query parameters
    this.router.navigate(['/customer/checkout', productID]);
  }
}



