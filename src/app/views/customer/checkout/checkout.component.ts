import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { QuantityService } from 'src/app/service/quantity.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
// Dev env
import { environment } from '../../../../../env/dev.environtment';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
// Prod env
// import { environment } from '../../../../../env/environtment';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutForm: FormGroup;
  orderItem: any;
  productId: string | null;
  quantity: number | 1;
  totalPrice?: number;
  isLoading: boolean = false;
  orderID: string = '';

  // Paypal
  public payPalConfig?: IPayPalConfig;
  apiKey: string = environment.FIXER_IO_CURRENCY_API_KEY;
  pricePerItemUSD: number = 0;
  totalPriceUSD: number = 0;
  showPayPalButton: boolean = false;

  ngOnInit(): void {
    // const userId = this.authService.getUserId();
    if (this.productId !== null) {
      //* PayPal init config
      this.orderItem = this.productService.getProductById(this.productId);
    }
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private quantityService: QuantityService,
    private orderService: OrderService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // paymentMethod: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      notes: ['', []],
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam;
    this.quantity = this.quantityService.getQuantity();

    if (this.productId !== null) {
      this.productService.getProductById(this.productId).subscribe(
        (product) => {
          this.orderItem = product;
          this.getTotalPrice();
        },
        (error) => {
          console.error('Error fetching product details:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
    }
  }

  convertToDisplayText(key: any): string {
    return key.replace(/(\d)/g, ' $1');
  }

  onBack() {
    // go back to previous page
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure you want to go back?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then
      (result => {
        if (result.isConfirmed) {
          window.history.back();
        }
      })
  }

  getTotalPrice(): number {
    this.totalPrice = this.orderItem.price * this.quantity;
    return this.totalPrice;
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

  getUSDPrice(): Promise<void> {
    return new Promise((resolve, reject) => {
      // let convertTotalPriceToUSD: number = 0;
      // let convertPricePerItemToUSD: number = 0;

      let pricePerItem = this.orderItem.price;
      let totalPrice = this.getTotalPrice();

      let fromMYR: string = 'MYR';
      let toUSD: string = 'USD';

      fetch(`http://data.fixer.io/api/latest?access_key=${this.apiKey}&symbols=${fromMYR},${toUSD}`)
        .then(res => res.json())
        .then(data => {
          //! API KEY BASE CURRENCY IS EUR, SO WE NEED TO CONVERT FROM MYR TO EUR FIRST
          let totalPriceEUR = totalPrice / data.rates[fromMYR];
          let pricePerItemEUR = pricePerItem / data.rates[fromMYR];
          //! THEN CONVERT FROM EUR TO USD
          let totalPriceUSD = totalPriceEUR * data.rates[toUSD];
          let totalItemPriceUSD = pricePerItemEUR * data.rates[toUSD] * this.quantity;

          //* Limit to 2 decimal places
          this.totalPriceUSD = parseFloat(totalPriceUSD.toFixed(2));
          this.pricePerItemUSD = parseFloat((totalItemPriceUSD / this.quantity).toFixed(2));
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  // On submit check out button to open paypal buttons
  onSubmit() {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      // Handle form submission and payment method selection
      const formData = this.checkoutForm.value;
      const userId = this.authService.getUserId();

      const orderData = {
        orderID: '',
        user: userId,
        contactInformation: {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
        },
        products: [
          {
            productId: this.productId,
            quantity: this.quantity,
          },
        ],
        totalAmount: this.totalPrice,
        totalQuantity: this.quantity,
        payment: {
          paymentMethod: '', //will be updated later
          amount: this.totalPrice,
        },
        status: 'Waiting', // set the initial status
        isReviewed: false,
        notes: formData.notes,
        date_created: new Date(),
        paypalData: null, // update this later after the PayPal transaction is completed
        paypalDetails: null, // update this later after the PayPal transaction is completed

      };
      this.getUSDPrice().then(() => {
        this.showPayPalButton = true;
        this.isLoading = false;
        this.initPaypalConfig();
      });

      this.orderService.createOrder(orderData).subscribe(
        (createdOrder) => {
          this.showPayPalButton = true;
          this.isLoading = false;
          this.orderID = createdOrder._id;
        },
        (error) => {
          console.error('Error creating order:', error);
          this.isLoading = false;
          // Handle the error, e.g., show an error message to the user
        }
      );
    }
    else {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all the required fields',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  //* PAYPAL
  public initPaypalConfig(): void {

    const itemPrice = this.pricePerItemUSD?.toFixed(2);
    const totalPrice = (this.pricePerItemUSD * this.quantity)?.toFixed(2);

    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.paypalClientId,
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: totalPrice,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: totalPrice,
                  }
                }
              },
              items: [
                {
                  name: this.orderItem.title,
                  quantity: this.quantity.toString(),
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: itemPrice,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue',
        shape: 'pill',
        // size: 'small',
      },

      onApprove: (data: any, actions: any) => {
        actions.order.get().then((details: any) => {
          const updatedOrderData = {
            payment: {
              paymentMethod: 'PayPal',
              amount: this.totalPrice,
            },
            //! Completed to Paid
            status: 'Paid',
            paypalData: data,
            paypalDetails: details,
          };

          // Update the order with the additional data
          this.orderService.updateOrder(this.orderID, updatedOrderData).subscribe(
            (updatedOrder) => {
              console.log('Order updated successfully:', updatedOrder);
            },
            (error) => {
              console.error('Error updating order:', error);
            }
          );

          if (this.productId !== null) {
            this.productService.updateSoldQty(this.productId, this.quantity).subscribe({
              next: (response) => {
                console.log('Sold quantity updated successfully:', response);
              },
              error: (error) => {
                console.error('Error updating sold quantity:', error);
              }
            });
          }

          // this.router.navigate(['/customer/checkout', this.productId]);
          Swal.fire({
            title: 'Payment Successful!',
            text: 'Thank you for your purchase!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Go to Dashboard',
            cancelButtonText: 'Go to Payment Page'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['customer/payment-history']);
            }
          });
        });
      },
      onClientAuthorization: (data: any) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

        // this.showSuccess = true;
        // this.router.navigate(['/customer/checkout', this.productId]);
        this.router.navigate(['/customer/checkout', this.productId]);
      },
      onCancel: (data: any, actions: any) => {
        console.log('OnCancel', data, actions);

        const updatedOrderData = {
          status: 'Failed',
        };

        // Update the order status to 'Failed'
        this.orderService.updateOrder(this.orderID, updatedOrderData).subscribe(
          (updatedOrder) => {
            console.log('Order updated successfully:', updatedOrder);
            // ... any additional logic after updating the order
          },
          (error) => {
            console.error('Error updating order:', error);
            // ... handle error
          }
        );

        this.router.navigate(['/customer/checkout', this.productId]);
      },
      onError: (err: any) => {
        console.log('OnError', err);
        // this.showError = true;
        this.router.navigate(['/customer/checkout', this.productId]);
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
      },
    };
  }

}
