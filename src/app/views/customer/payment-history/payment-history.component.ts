import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'env/dev.environtment';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { PaymentService } from 'src/app/service/payment-service';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent {

  paymentId: number | null;
  payment: any;
  // paymentsDummy: any = [];
  paymentsData: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private authService: AuthService,
    private productService: ProductService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
  this.paymentId = idParam ? parseInt(idParam, 10) : null;
  }

  ngOnInit(): void {
    const userID = this.authService.getUserId();
  
    if (userID) {
      this.orderService.getOrderByUserId(userID).subscribe({
        next: (data) => {
          this.paymentsData = data;
          console.log('PAYMENT DATA ' + JSON.stringify(this.paymentsData, null, 2));
  
          // Loop through paymentsData
          this.paymentsData.forEach((payment: any) => {
            // Extract product IDs from the products array
            const productIds = payment.products.map((product: any) => product.productId);
  
            // Fetch product details for each product ID
            const productRequests = productIds.map((productId: string) => {
              return this.productService.getProductById(productId);
            });
  
            // Use forkJoin to handle multiple requests concurrently
            forkJoin(productRequests).subscribe({
              next: (products: any) => {
                // Attach product details to the corresponding payment
                payment.products = products;
                console.log('COBA PAYMENT DATA ' + payment._id);
                console.log('is reviewd ' + payment.isReviewed);
                
              },
              error: (error) => {
                console.log(error);
              }
            });
          });
        },
        error: (error) => {
          console.log(error);
        }
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


  viewDetail = (paymentID: Number) => {
    this.router.navigate(['/customer/payment-history-detail', paymentID]);
  }

  addReview = (paymentID: Number) => {
    // Swal.fire({
    //   title: 'Submit a Review',
    //   html: `
    //     <div class="mb-3">
    //       <label for="starRating" class="block mb-1">Rating:</label>
    //       <select id="starRating" class="w-full p-2 border rounded-md" required>
    //         <option value="1">1 Star</option>
    //         <option value="2">2 Stars</option>
    //         <option value="3">3 Stars</option>
    //         <option value="4">4 Stars</option>
    //         <option value="5">5 Stars</option>
    //       </select>
    //     </div>
    //     <div>
    //       <label for="reviewText" class="block mb-1">Review:</label>
    //       <textarea id="reviewText" class="w-full p-2 border rounded-md" rows="5" required placeholder="Write your review here..."></textarea>
    //     </div>
    //   `,
    //   showCancelButton: true,
    //   confirmButtonText: 'Submit',
    //   cancelButtonText: 'Cancel',
    //   focusConfirm: false,
    //   preConfirm: () => {
    //     const selectedRating = (document.getElementById('starRating') as HTMLSelectElement).value;
    //     const reviewText = (document.getElementById('reviewText') as HTMLTextAreaElement).value;
    //     if (!reviewText) {
    //       Swal.showValidationMessage('Please enter your review.');
    //       return false; // Prevent closing the modal
    //     } else if (selectedRating === '0') {
    //       Swal.showValidationMessage('Please select a rating.');
    //       return false; // Prevent closing the modal
    //     } else {
    //       Swal.fire({
    //         title: 'Success',
    //         text: 'Review submitted with rating ' + selectedRating + ' and review text: ' + reviewText,
    //         icon: 'success',
    //       })
    //       return true;
    //     }
    //   },
    // });
    this.router.navigate(['/customer/add-review', paymentID]);
  }

  payNow = (paymentID: Number) => {
    this.router.navigate(['/customer/checkout', paymentID]);
  }

  filterByStatus = (status: String) => {
    this.router.navigate(['/payment-history', { status: status }]);
  }

}
