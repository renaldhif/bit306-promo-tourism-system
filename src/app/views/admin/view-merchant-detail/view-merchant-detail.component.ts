import { Component } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { MerchantService } from 'src/app/service/merchant-service';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// Dev env
import { environment } from '../../../../../env/dev.environtment';
// Prod env
// import { environment } from '../../../../../env/environtment';

@Component({
  selector: 'app-view-merchant-detail',
  templateUrl: './view-merchant-detail.component.html',
  styleUrls: ['./view-merchant-detail.component.css']
})
export class ViewMerchantDetailComponent {

  merchantId : string;
  merchant : any;
  fullDocumentUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private adminService: AdminService,
    private router: Router
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.merchantId = idParam ?? '';
  }

  ngOnInit(): void {

    if (this.merchantId) {
      this.adminService.getMerchantDetail(this.merchantId).subscribe(res => {
        this.merchant = res;
        // Check if documentPath is valid before constructing URL
        const documentPath = this.merchant.document;
        if (documentPath) {
          const baseUrl = environment.apiUrl;
          this.fullDocumentUrl = baseUrl + documentPath;
        }
      });
    }
  }

  viewMerchantFile = () => {
    if (!this.fullDocumentUrl || this.fullDocumentUrl.includes('null')) {
      Swal.fire({
        icon: 'error',
        title: 'Error occured while opening file',
        text: 'It seems the document is not available, or there might be an issue with the file'
      });
    } else {
      // Open document in new tab
      window.open(this.fullDocumentUrl, '_blank');
    }
  }

  viewMerchantAnalytics = () => {
    this.router.navigate(['/admin/analytics', this.merchantId]);
  }
}
