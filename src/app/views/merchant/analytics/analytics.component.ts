import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  isLoading = false;
  isFetched = false;
  selectedOption: string = 'productSold';

  // get merchant id from query params
  merchantId: string = '';
  merchantName: string = '';

  // product sold
  label: string[] = [];
  data: any[] = [];

  // customer purchasing power
  customerLabels: string[] = [];
  customerData: number[] = [];

  // isProductDataEmpty = true;
  // isCustomerDataEmpty = true;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // get merchant id first
    const userId = this.authService.getUserId();
    // get merchant details
    if (userId) {
      this.userService.getUserDetails(userId).subscribe((merchant) => {
        this.merchantId = merchant._id;
        this.merchantName = merchant.fullname;
        console.log('merchant id ngOnInit Analytics Merchant: ', this.merchantId);
        console.log('merchant name ngOnInit Analytics Merchant: ', this.merchantName);

        // get product analytics
        this.fetchProductAnalytics();

        // get customer purchasing power
        this.fetchCustomerPurchasingPower();
      });
    }
  }

  async fetchProductAnalytics() {
    const products = await this.orderService.getProductAnalytics(this.merchantId).toPromise();
    if (products.length > 0) {
      products.forEach((product: any) => {
        this.label.push(product.title);
        this.data.push(product.soldQty);
      });
      // this.isProductDataEmpty = false; // Set to false if data is not empty
    } else if (products.length === 0 || null) {
      // this.isProductDataEmpty = true;
      console.log('No product analytics available');
    }
    else{
      console.log('No product analytics available');
    }
    this.isLoading = false; // Set loading to false after data is fetched
    this.cdr.markForCheck(); // mark for check
    this.createChartProductSold('productSold', 'Sold Quantity', this.data);
    this.isFetched = true;
  }

  async fetchCustomerPurchasingPower() {
    const customers = await this.orderService.getCustomerPurchasingPower(this.merchantId).toPromise();
    if (customers.length > 0) {
      customers.forEach((customer: any) => {
        this.customerLabels.push(customer.name);
        this.customerData.push(customer.totalAmount);
      });
    } else if (customers.length === 0 || null) {
      // this.isCustomerDataEmpty = true;
      console.log('No customer purchasing power analytics available');
    }
    else{
      console.log('No customer purchasing power analytics available');
    }
    this.isLoading = false; // Set loading to false after data is fetched
    this.cdr.markForCheck(); // mark for check
    this.createChartCustomerPurchasingPower('customerPurchasingPower', 'Customer Purchasing Power', this.customerData);
    this.isFetched = true;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.cdr.detectChanges(); // this is needed here, otherwise the chart will not be rendered
    if (option === 'productSold') {
      this.createChartProductSold('productSold', 'Sold Quantity', this.data);
      this.selectedOption = 'productSold';
    } else if (option === 'customerPurchasingPower') {
      this.createChartCustomerPurchasingPower('customerPurchasingPower', 'Customer Purchasing Power', this.customerData);
      this.selectedOption = 'customerPurchasingPower';
    }
  }

  createChartProductSold(chartId: string, label: string, data: any[]) {
    const barChart = document.getElementById('productSold') as HTMLCanvasElement;
    if (!barChart) return;

    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [{
          label: 'Sold Quantity',
          data,
          backgroundColor: '#93c5fd',
          borderColor: '#2563eb',
          borderWidth: 2
        }]
      },
      options: {
        indexAxis: 'x',
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createChartCustomerPurchasingPower(chartId: string, chartLabel: string, data: any[]) {
    const barChart = document.getElementById(chartId) as HTMLCanvasElement;
    if (!barChart) return;

    // const labels = data.map(customer => customer.name);
    // const amounts = data.map(customer => customer.totalAmount);

    new Chart(barChart, {
      type: 'bar',
      data: {
        // labels: labels,
        labels: this.customerLabels,
        datasets: [{
          label: chartLabel,
          // data: amounts,
          data,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
