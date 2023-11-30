import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent {

  // dummy data, will be replace with real data from backend
  totalMerchants = [5, 10, 15, 20];
  verifiedMerchants = [5, 7, 10, 15];
  pendingMerchants = [0, 2, 4, 4];
  rejectedMerchants = [0, 1, 1, 1];

  ngOnInit() {
    this.createChart('totalMerchantsChart', 'Total Merchants', this.totalMerchants);
    this.createChart('verifiedMerchantsChart', 'Verified Merchants', this.verifiedMerchants);
    this.createChart('pendingMerchantsChart', 'Pending Merchants', this.pendingMerchants);
    this.createChart('rejectedMerchantsChart', 'Rejected Merchants', this.rejectedMerchants);
  }

  createChart(chartId: string, label: string, data: number[]) {
    const barChart = document.getElementById(chartId) as HTMLCanvasElement;
    if (!barChart) return;

    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: ['Sept', 'Oct', 'Nov', 'Dec'],
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
}
