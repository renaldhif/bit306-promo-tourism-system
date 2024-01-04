import { ChangeDetectorRef, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css'],
})
export class AdminAnalyticsComponent {
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

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.merchantId = this.route.snapshot.paramMap.get('id')!;

    // get merchant name
    this.userService
      .getUserDetailsWithoutAuth(this.merchantId)
      .subscribe((merchant) => {
        this.merchantName = merchant.fullname;
      });

    // get product analytics
    this.fetchProductAnalytics();

    // get customer purchasing power
    this.fetchCustomerPurchasingPower();
  }

  async fetchProductAnalytics() {
    const products = await this.orderService
      .getProductAnalytics(this.merchantId)
      .toPromise();
    if (products.length > 0) {
      products.forEach((product: any) => {
        this.label.push(product.title);
        this.data.push(product.soldQty);
      });
      // this.isProductDataEmpty = false; // Set to false if data is not empty
    } else if (products.length === 0 || null) {
      // this.isProductDataEmpty = true;
      console.log('No product analytics available');
    } else {
      console.log('No product analytics available');
    }
    this.cdr.markForCheck(); // mark for check
    this.createChartProductSold('productSold', 'Sold Quantity', this.data);
  }

  async fetchCustomerPurchasingPower() {
    const customers = await this.orderService
      .getCustomerPurchasingPower(this.merchantId)
      .toPromise();
    if (customers.length > 0) {
      customers.forEach((customer: any) => {
        this.customerLabels.push(customer.name);
        this.customerData.push(customer.totalAmount);
      });
    } else if (customers.length === 0 || null) {
      // this.isCustomerDataEmpty = true;
      console.log('No customer purchasing power analytics available');
    } else {
      console.log('No customer purchasing power analytics available');
    }
    this.cdr.markForCheck(); // mark for check
    this.createChartCustomerPurchasingPower(
      'customerPurchasingPower',
      'Customer Purchasing Power',
      this.customerData
    );
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.cdr.detectChanges(); // this is needed here, otherwise the chart will not be rendered
    if (option === 'productSold') {
      this.createChartProductSold('productSold', 'Sold Quantity', this.data);
      this.selectedOption = 'productSold';
    } else if (option === 'customerPurchasingPower') {
      this.createChartCustomerPurchasingPower(
        'customerPurchasingPower',
        'Customer Purchasing Power',
        this.customerData
      );
      this.selectedOption = 'customerPurchasingPower';
    }
  }

  createChartProductSold(chartId: string, label: string, data: any[]) {
    const barChart = document.getElementById(
      'productSold'
    ) as HTMLCanvasElement;
    if (!barChart) return;

    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [
          {
            label: 'Sold Quantity',
            data,
            backgroundColor: '#93c5fd',
            borderColor: '#2563eb',
            borderWidth: 2,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createChartCustomerPurchasingPower(
    chartId: string,
    chartLabel: string,
    data: any[]
  ) {
    const barChart = document.getElementById(chartId) as HTMLCanvasElement;
    if (!barChart) return;

    // const labels = data.map(customer => customer.name);
    // const amounts = data.map(customer => customer.totalAmount);

    new Chart(barChart, {
      type: 'bar',
      data: {
        // labels: labels,
        labels: this.customerLabels,
        datasets: [
          {
            label: chartLabel,
            // data: amounts,
            data,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
