import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/service/merchant-service';
import { AdminService } from 'src/app/service/admin.service';

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
    private adminService: AdminService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.merchantId = idParam ?? '';
  }

  ngOnInit(): void {
    console.log('merchantID passed in: ', this.merchantId);
    if (this.merchantId) {
      this.adminService.getMerchantDetail(this.merchantId).subscribe(res => {
        this.merchant = res;
        console.log('merchant detail: ', this.merchant);

        // Construct the full document URL after getting the merchant details
        const baseUrl = environment.apiUrl;
        const documentPath = this.merchant.document;
        this.fullDocumentUrl = baseUrl + documentPath;
        console.log('full document url: ', this.fullDocumentUrl);
      });
    }
  }

  viewMerchantFile = () => {
    console.log('opening file:' + this.fullDocumentUrl);
    window.open(this.fullDocumentUrl, '_blank');
  }

}
