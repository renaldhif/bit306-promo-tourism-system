import { Component } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';
import { AdminService } from '../../../service/admin.service';
Chart.register(...registerables);
@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent {

  // currentYear: number = new Date().getFullYear();
  totalMerchantsChart?: any;
  totalCustomersChart?: any;

  selectedYear?: number;
  years: number[] = [];
  currentYear: number = 2024;
  startYear = 2023;

  // total merchants from Jan to Dec
  totalMerchants: number[] = new Array(12).fill(0);
  totalCustomers: number[] = new Array(12).fill(0);

  // verifiedMerchants = [5, 7, 10, 15];
  // pendingMerchants = [0, 2, 4, 4];
  // rejectedMerchants = [0, 1, 1, 1];

  constructor(private adminService: AdminService) {}
  ngOnInit() {
    // const currentYear = new Date().getFullYear();
    const currentYear = this.currentYear;
    console.log("currentYear admin-analytics.component:", currentYear)
    for (let year = this.startYear; year <= this.currentYear; year++) {
      this.years.push(year);
    }

    // this.fetchMerchantData(currentYear);
    // this.fetchCustomerData(currentYear);
    // this.createChart('totalMerchantsChart', 'Total Merchants', this.totalMerchants);
    // this.createChart('verifiedMerchantsChart', 'Verified Merchants', this.verifiedMerchants);
    // this.createChart('pendingMerchantsChart', 'Pending Merchants', this.pendingMerchants);
    // this.createChart('rejectedMerchantsChart', 'Rejected Merchants', this.rejectedMerchants);
  }

  // fetchMerchantData() {
  //   this.adminService.getMerchantsByMonth().subscribe(data => {
  //     this.processMerchantData(data);
  //     console.log("🚀 ~ file: admin-analytics.component.ts:30 ~ AdminAnalyticsComponent ~ this.adminService.getMerchantsByMonth ~ data:", data)


  //     this.createChart('totalMerchantsChart', 'Total Merchants', this.totalMerchants);
  //   });
  // }

  onYearChange(event: Event) {
    const selectedYear = parseInt((event.target as HTMLSelectElement).value, 10);
    this.selectedYear = selectedYear;
    console.log('selectedYear:', selectedYear);
    this.fetchMerchantData(selectedYear);
    this.fetchCustomerData(selectedYear);
  }

  //* MERCHANTs

  fetchMerchantData(year: number) {
    this.selectedYear = year;
    this.adminService.getMerchantsByMonth(year).subscribe(data => {
      this.processMerchantData(data);
      console.log("🚀 ~ file: admin-analytics.component.ts:45 ~ AdminAnalyticsComponent ~ this.adminService.getMerchantsByMonth ~ data:", data)

      if (this.totalMerchantsChart) {
        this.totalMerchantsChart.destroy();
      }
      else{
        this.createChart('totalMerchantsChart', 'Total Merchants', this.totalMerchants);
      }
    });
  }

  processMerchantData(data: any[]) {
    data.forEach(item => {
      if (item._id.year === new Date().getFullYear()) {
        // Assuming months are 1-indexed (January is 1)
        this.totalMerchants[item._id.month - 1] = item.count;
      }
    });
  }

  //* CUSTOMERs

  fetchCustomerData(year: number) {
    this.adminService.getCustomersByMonth(year).subscribe(data => {
      this.processCustomerData(data);
      console.log("🚀 ~ file: admin-analytics.component.ts:63 ~ AdminAnalyticsComponent ~ this.adminService.getCustomersByMonth ~ data:", data)

      console.log('check this.totalCustomers:', this.totalCustomers);
      if (this.totalCustomersChart) {
        this.destroyChartById(1);
      }
      else{
        this.totalCustomersChart = this.createChart('totalCustomersChart', 'Total Customers', this.totalCustomers);
      }
    });
  }

  processCustomerData(data: any[]) {
    data.forEach(item => {
      if (item._id.year === new Date().getFullYear()) {
        // Assuming months are 1-indexed (January is 1)
        this.totalCustomers[item._id.month - 1] = item.count;
      }
    });
  }

  createChart(chartId: string, label: string, data: number[]) {
    const barChart = document.getElementById(chartId) as HTMLCanvasElement;
    if (!barChart) return;

    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label,
          data,
          backgroundColor: '#60a5fa',
          borderColor: '#3b82f6',
          borderWidth: 1
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

  destroyChartById(chartId: any) {
    console.log('chartId passed to destroy:', chartId);

    const chart = document.getElementById(chartId) as HTMLCanvasElement;
    if (chart) {
      chart.remove();
    }
  }
}
