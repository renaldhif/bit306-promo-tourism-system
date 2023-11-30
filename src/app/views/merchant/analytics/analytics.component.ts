import { Component } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  // dummy data, will be replace with real data from backend
  totalRevenues = [2545.50, 3655, 5500, 5000];
  totalProducts = [10, 18, 25, 37];
  totalOrders = [120, 150, 325, 300];

  ngOnInit() {
    this.createChart('revenueChart', 'Total Revenues (MYR)', this.totalRevenues);
    this.createChart('productsChart', 'Total Products', this.totalProducts);
    this.createChart('ordersChart', 'Total Orders', this.totalOrders);
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
