import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-merchant-header-stats',
  templateUrl: './merchant-header-stats.component.html',
  styleUrls: ['./merchant-header-stats.component.css']
})
export class MerchantHeaderStatsComponent {
  userDetails: any;
  name: string = 'Merchant ';
  isLoggedIn: boolean = this.authService.isLoggedIn();
  products: any[] = [];
  productLength: number = 0;
  orders: any[] = [];
  orderLength: number = 0;
  revenueCurrentMonth: number = 0;
  revenue: number = 0;

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private productService: ProductService, private orderService: OrderService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserDetails(userId).subscribe({
        next: (data) => {
          this.userDetails = data;
          this.name = this.userDetails.fullname;
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.productService.getProductsByMerchant(userId).subscribe({
        next: (data) => {
          this.products = data;
          this.productLength = this.products.length;
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.orderService.getOrderByMerchantId(userId).subscribe({
        next: (data) => {
          this.orders = data;
          this.orderLength = this.orders.length;
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.orderService.getRevenueForCurrentMonth(userId).subscribe({
        next: (data) => {
          this.revenueCurrentMonth = data.totalRevenue;
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.orderService.getMerchantRevenue(userId).subscribe({
        next: (data) => {
          this.revenue = data.totalRevenue;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  // logout
  logout = () => {
    // simulate delay in logout through swal
    Swal.fire({
      title: 'Logging out...',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
