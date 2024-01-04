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
  paymentsFilteredData: any = [];

  currentFilter: string = 'All';
  isLoading: boolean = false;
  isFetched: boolean = false;

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
      this.isLoading = true;
      this.orderService.getOrderByUserId(userID).subscribe({
        next: (data) => {
          this.paymentsData = data;
          if (this.paymentsData.length === 0) {
            this.isLoading = false;
            this.isFetched = true;
          }
          else {
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

                  // * FILTER PAYMENT BY STATUS
                  this.updateFilteredPayments();
                  this.isLoading = false;
                  this.isFetched = true;
                },
                error: (error) => {
                  console.log(error);
                }
              });
            });
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    // this.isLoading = false;
    // this.isFetched = true;
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
    this.router.navigate(['/customer/add-review', paymentID]);
  }

  payNow = (paymentID: Number) => {
    this.router.navigate(['/customer/checkout', paymentID]);
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.updateFilteredPayments();
  }

  updateFilteredPayments() {
    if (this.currentFilter === 'All') {
      this.paymentsFilteredData = this.paymentsData;
    } else {
      this.paymentsFilteredData = this.paymentsData.filter((payment: any) => payment.status === this.currentFilter);
    }

     // Sort by newest transaction
    this.paymentsFilteredData.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime(); // This will sort in descending order
    });
  }

}
