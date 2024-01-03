import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/service/payment-service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product-service';
import { forkJoin } from 'rxjs';
import { environment } from 'env/dev.environtment';


@Component({
  selector: 'app-payment-history-detail',
  templateUrl: './payment-history-detail.component.html',
  styleUrls: ['./payment-history-detail.component.css']
})
export class PaymentHistoryDetailComponent {

  paymentDetails: any = [];
  paymentId: string | null;


  ngOnInit(): void {
    if (this.paymentId !== null) {
      this.orderService.getOrderById(this.paymentId).subscribe(
        (payment) => {
          if (!payment) {
            // Handle the case where the product is not found
            console.error('Payment not found.');
            // Redirect or show an error message
          } else {
            this.paymentDetails = payment;
            console.log('PAYMENT DETAILS ' + JSON.stringify(this.paymentDetails, null, 2));

            // Extract product IDs from the products array
            const productIds = this.paymentDetails.products.map((product: any) => product.productId);

            // Fetch product details for each product ID
            const productRequests = productIds.map((productId: string) => {
              return this.productService.getProductById(productId);
            });

            // Use forkJoin to handle multiple requests concurrently
            forkJoin(productRequests).subscribe({
              next: (products: any) => {
                // Attach product details to the corresponding payment
                this.paymentDetails.products = products;
                console.log('COBA PAYMENT DATA ' + JSON.stringify(this.paymentDetails, null, 2));
                console.log('is reviewed ' + this.paymentDetails.isReviewed);
              },
              error: (error) => {
                console.log(error);
              }
            });
          }
        },
        (error) => {
          console.error('Error fetching payment details:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
    }

    console.log('=====DEBUG=====');
    console.log(JSON.stringify(this.paymentDetails, null, 2));
    // Check if payment and its properties are defined before accessing them
    if (this.paymentDetails?.products) {
      console.log(this.paymentDetails.products);
    } else {
      console.log('Payment product is not defined.');
    }

    console.log('\n=========');

    // Check if payment and its properties are defined before accessing them
    if (this.paymentDetails?.products[0]?.merchant) {
      console.log(this.paymentDetails.products[0].merchant);
    } else {
      console.log('Payment merchant is not defined.');
    }
  }
  // ngOnInit(): void {
  //   if (this.paymentId !== null) {
  //     this.orderService.getOrderById(this.paymentId).subscribe(
  //       (payment) => {
  //         if (!payment) {
  //           // Handle the case where the product is not found
  //           console.error('Payment not found.');
  //           // Redirect or show an error message
  //         } else {
  //           this.paymentDetails = payment;
  //           console.log('PAYMENT DETAILS ' + JSON.stringify(this.paymentDetails, null, 2));
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching payment details:', error);
  //         // Handle the error, e.g., show an error message to the user
  //       }
  //     );
  //   }

  //   console.log('=====DEBUG=====');
  //   console.log(JSON.stringify(this.paymentDetails, null, 2));
  //   // Check if payment and its properties are defined before accessing them
  //   if (this.paymentDetails?.products) {
  //     console.log(this.paymentDetails.products);
  //   } else {
  //     console.log('Payment product is not defined.');
  //   }

  //   console.log('\n=========');

  //   // Check if payment and its properties are defined before accessing them
  //   if (this.paymentDetails?.products[0]?.merchant) {
  //     console.log(this.paymentDetails.products[0].merchant);
  //   } else {
  //     console.log('Payment merchant is not defined.');
  //   }
  // }

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.paymentId = idParam ? idParam : null;
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

  getProductImageURL(imagePath: string | undefined): string {
    if (!imagePath) {
      // Handle the case where imagePath is undefined
      return ''; // or a default image URL
    }

    // Check if the imagePath is an absolute URL (starts with "http" or "/")
    if (imagePath.startsWith('http')) {
      return imagePath; // It's already an absolute URL
    } else {
      // Assuming there is a base URL for your images
      const baseURL = environment.apiUrl;
      return baseURL + imagePath;
    }
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
    } else if (paymentMethod === 'card') {
      return 'Credit Card';
    }
    return '';
  }

  getPaymentMethodIcon(paymentMethod: string): string {
    console.log('PAYMENT METHODNYA APA', paymentMethod);
    if (paymentMethod === 'PayPal') {
      return '../../../../assets/icons/ic_paypal.svg';
    } else if (paymentMethod === 'card') {
      return '../../../../assets/icons/ic_creditcard.png';
    }
    return '';
  }

}
