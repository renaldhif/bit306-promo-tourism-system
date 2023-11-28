import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/service/merchant-service';

@Component({
  selector: 'app-view-merchant-detail',
  templateUrl: './view-merchant-detail.component.html',
  styleUrls: ['./view-merchant-detail.component.css']
})
export class ViewMerchantDetailComponent {

  merchantId : number | null;
  merchant : any;

  constructor(private route: ActivatedRoute, private merchantService: MerchantService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.merchantId = idParam ? parseInt(idParam, 10) : null;
  }

  ngOnInit(): void {
    if (this.merchantId !== null) {
      this.merchant = this.merchantService.getMerchantById(this.merchantId);
    }
  }

}
