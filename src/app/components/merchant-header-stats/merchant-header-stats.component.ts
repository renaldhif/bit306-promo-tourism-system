import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant-header-stats',
  templateUrl: './merchant-header-stats.component.html',
  styleUrls: ['./merchant-header-stats.component.css']
})
export class MerchantHeaderStatsComponent {
  name = 'Merchant Meong Meong';

  // logout
  logout = () => {
    Swal.fire({
      title: 'Logout',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4ade80',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logout',
          text: "You have been logged out successfully!",
          icon: 'success',
          confirmButtonColor: '#4ade80',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/login';
          }
        })
      }
    })
  }
}
