import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'env/dev.environtment';
import { forkJoin } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product-service';
import { ReviewService } from 'src/app/service/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  ratingForm: FormGroup;
  selectedRating: number = 0;
  ratingDescription: string = '';
  orderId: string = '';
  order: any;
  reviewId: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
  ) {
    this.ratingForm = this.fb.group({
      rating: [null,[Validators.required]],
      comments: [''],
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    this.orderId = idParam ? idParam : '';
  }

  idParam = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getOrderDetails(this.orderId);
  }

  onRatingChange() {
    this.ratingForm.get('rating')?.setValue(this.selectedRating);
    this.setRatingDescription(this.selectedRating);
  }

  get rating() {
    return this.ratingForm.get('rating');
  }

  get comments() {
    return this.ratingForm.get('comments');
  }

  // get star rating description
  switchRatingDescription(rating: number) {
    switch (rating) {
      case 0:
        return '';
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  }

  setRatingDescription(rating: number) {
    this.ratingDescription = this.switchRatingDescription(rating);
  }

  getOrderDetails(id: string): void {
    this.orderService.getOrderById(id).subscribe(
      order => {
        this.order = order;

        // Extract product IDs from the products array
        const productIds = this.order.products.map((product: any) => product.productId);

        // Fetch product details for each product ID
        const productRequests = productIds.map((productId: string) => {
          return this.productService.getProductById(productId);
        });

        // Use forkJoin to handle multiple requests concurrently
        forkJoin(productRequests).subscribe({
          next: (products: any) => {
            // Attach product details to the corresponding order
            this.order.products = products;
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error => {
        console.error('Error fetching order details:', error);
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

  onSubmit() {
    // Create a review object with the data from the form
    const reviewData = {
      rating: this.ratingForm.value.rating,
      comment: this.ratingForm.value.comments,
      user: this.order.user,
      product: this.order.products[0]._id,
    };

    // Call the addReview service method from ReviewService to submit the review
    if(this.ratingForm.valid){
      this.reviewService.addReview(reviewData).subscribe({
        next: (response) => {
          console.log('Review submitted successfully:', response);
          // thankyou message
          Swal.fire({
            title: 'Thank you!',
            text: 'Your review has been submitted successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            this.productService.addReview(this.order.products[0]._id, response._id).subscribe({
              next: (response) => {
                console.log('Review submitted to product successfully:', response);
              },
              error: (error) => {
                console.error('Error submitting review:', error);
              }
            });
            if (result.isConfirmed) {
              this.productService.updateRating(this.order.products[0]._id, reviewData.rating).subscribe({
                next: (response) => {
                  console.log('Rating updated successfully:', response);
                },
                error: (error) => {
                  console.error('Error submitting review:', error);
                }
              });
              // this.router.navigate(['/customer/payment-history']);
              window.location.href = '/customer/payment-history';
            }
          })
        },
        error: (error) => {
          console.error('Error submitting review:', error);
        }

      });
      this.orderService.updateOrderIsReviewed(this.orderId, true).subscribe({
        next: (response) => {
          console.log('Order updated successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting review:', error);
        }
      });
    }
    else{
      Swal.fire({
        title: 'Oops...!',
        text: 'Please fill the star rating!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
}
