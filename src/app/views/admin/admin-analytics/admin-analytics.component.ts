import { ChangeDetectorRef, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
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
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.merchantId = this.route.snapshot.paramMap.get('id')!;
    console.log('merchant id: ', this.merchantId);

    // get merchant name
    this.userService.getUserDetailsWithoutAuth(this.merchantId).subscribe((merchant) => {
      this.merchantName = merchant.fullname;
    });

    // get product analytics
    this.orderService.getProductAnalytics(this.merchantId).subscribe((products) => {
      products.forEach((product: any) => {
        this.label.push(product.title);
        this.data.push(product.soldQty);
      });
      this.createChartProductSold('productSold', 'Sold Quantity', this.data);
    });

    // get customer purchasing power
    this.orderService.getCustomerPurchasingPower(this.merchantId).subscribe((customers) => {
      customers.forEach((customer: any) => {
        this.customerLabels.push(customer.fullname);
        this.customerData.push(customer.totalSpent);
      });
      this.createChartCustomerPurchasingPower('customerPurchasingPower', 'Customer Purchasing Power', this.customerData);
    });
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

  createChartCustomerPurchasingPower(chartId: string, chartLabel: string, data: any) {
    const barChart = document.getElementById('customerPurchasingPower') as HTMLCanvasElement;
    if (!barChart) return;
    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: [data.name],
        datasets: [{
          label: chartLabel,
          data: [data.totalAmount],
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
