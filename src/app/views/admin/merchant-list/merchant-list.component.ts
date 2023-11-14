import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent {

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  // dummy data for merchants
  merchantsDummy = [
    {
      id: 1,
      type: 'merchant',
      name: 'Bali Agung Tours',
      description: 'Bali Agung Tours is a local tour operator in Bali. Lorem Ipsum dolor sit amet.',
      phone: '08123456789',
      email: 'baliagungtours@gmail.com',
      status: 'verified',
      created_at: '2023-11-12T19:58:56+08:00',
    },
    {
      id: 2,
      type: 'merchant',
      name: 'Jakartours',
      description: 'Jakartours is a local tour operator in Jakarta. Lorem Ipsum dolor sit amet.',
      phone: '081222343345',
      email: 'jakartours@gmail.com',
      status: 'verified',
      created_at: '2023-11-12T19:58:56+08:00',
    },
    {
      id: 3,
      type: 'merchant',
      name: 'Jelajah Bandung',
      description: 'Bandungtours is a local tour operator in Bandung. Lorem Ipsum dolor sit amet.',
      phone: '085799998888',
      email: 'jelajahbandung@gmail.com',
      status: 'pending',
      created_at: '2023-11-12T19:58:56+08:00',
    },
    {
      id: 4,
      type: 'merchant',
      name: 'Explore Sumatera',
      description: ' Explore sumatera is a local tour operator in Sumatera. Lorem Ipsum dolor sit amet.',
      phone: '08123456789',
      email: 'exploresumatera@gmail.com',
      status: 'pending',
      created_at: '2023-11-12T19:58:56+08:00',
    },
    {
      id: 5,
      type: 'merchant',
      name: 'Bali Agung Tours 2',
      description: 'Bali Agung Tours is a local tour operator in Bali. Lorem Ipsum dolor sit amet.',
      phone: '085169696969',
      email: 'baliagungtours2@gmail.com',
      status: 'rejected',
      created_at: '2023-11-12T19:58:56+08:00',
    },
  ];


  // Swal
  onAcceptMerchant = () => {
    Swal.fire({
      title: 'Accept merchant?',
      text: "Are you sure want to accept this merchant?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4ade80',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Accepted!',
          'Merchant has been accepted.',
          'success'
        )
      }
    })
  }

  onRejectMerchant = () => {
    Swal.fire({
      title: 'Reject merchant?',
      text: "Are you sure want to reject this merchant?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4ade80',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Rejected!',
          'Merchant has been rejected.',
          'success'
        )
      }
    })
  }

}
