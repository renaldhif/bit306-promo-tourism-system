import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MerchantService } from 'src/app/service/merchant-service';
import { AdminService } from 'src/app/service/admin.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // merchantsDummy: any[] = [];
  merchantList: any[] = [];

  constructor(
    private router:Router,
    private merchantService: MerchantService,
    private adminService: AdminService
  ){}

  ngOnInit(): void {

    this.fetchMerchantListAPI();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
  fetchMerchantListAPI = () => {
    this.adminService.getAllMerchants().subscribe((res: any) => {
      this.merchantList = res;
      this.dtTrigger.next(null as any);
    });
  }
  // Swal
  onShowMerchantDetail = (merchantID: number) => {
    this.router.navigate(['/admin/view-merchant-detail', merchantID]);
  }


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
