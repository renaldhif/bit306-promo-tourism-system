import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/service/payment-service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-payment-history-detail',
  templateUrl: './payment-history-detail.component.html',
  styleUrls: ['./payment-history-detail.component.css']
})
export class PaymentHistoryDetailComponent {

  paymentDetails: any = [];
  paymentId: number | null;

  ngOnInit(): void {
    if (this.paymentId !== null) {
      this.paymentDetails = this.paymentService.getPaymentById(this.paymentId);
    }

    console.log('=====DEBUG=====');
    console.log(JSON.stringify(this.paymentDetails, null, 2));
    // Check if payment and its properties are defined before accessing them
    if (this.paymentDetails?.product) {
      console.log(this.paymentDetails.product);
    } else {
      console.log('Payment product is not defined.');
    }

    console.log('\n=========');

    // Check if payment and its properties are defined before accessing them
    if (this.paymentDetails?.merchant) {
      console.log(this.paymentDetails.merchant);
    } else {
      console.log('Payment merchant is not defined.');
    }
  }

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.paymentId = idParam ? parseInt(idParam, 10) : null;
  }

  fetchImage = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    // return new File([blob], 'image.jpg', { type: 'image/jpeg' });

    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  downloadInvoice = async () => {
    // timeout 2 seconds to simulate generating pdf
    Swal.fire({
      title: 'Downloading',
      text: 'Generating invoice...',
      timer: 2000
    })
    let doc: any = document.getElementById('invoice-content');
    html2canvas(doc).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(imgData, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`promotourism-invoiceid${this.paymentDetails.id}.pdf`);
    });
  };

  convertPaymentMethodName(paymentMethod: string): string {
    if (paymentMethod === 'paypal') {
      return 'PayPal';
    } else if (paymentMethod === 'creditcard') {
      return 'Credit Card';
    }
    return '';
  }

  getPaymentMethodIcon(paymentMethod: string): string {
    if (paymentMethod === 'paypal') {
      return '../../../../assets/icons/ic_paypal.svg';
    } else if (paymentMethod === 'creditcard') {
      return '../../../../assets/icons/ic_creditcard.png';
    }
    return '';
  }

}
