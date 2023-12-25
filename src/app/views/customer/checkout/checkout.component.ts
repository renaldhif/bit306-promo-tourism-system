import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import { Router } from '@angular/router';
import { QuantityService } from 'src/app/service/quantity.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutForm: FormGroup;
  orderItem: any;
  productId: string | null;
  quantity:number | 1;

  ngOnInit(): void {
    if (this.productId !== null) {
      this.orderItem = this.productService.getProductById(this.productId);
    }
  }

  constructor(
    private router:Router, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private productService: ProductService,
    private quantityService: QuantityService
    ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      notes: ['', []],
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam;

    // might not appropriate to use query parameters here to pass the quantity
    // later we will use a service or state management to store the quantity
    // this.route.queryParams.subscribe((params) => {
    //   this.quantity = +params['quantity'];
    // });

    // // intialize quantity to 1 if no query parameter is passed
    // if (this.route.snapshot.queryParamMap.get('quantity') == null) {
    //   this.quantity = 1;
    // }

    // this.quantityService.quantity$.subscribe((quantity) => {
    //   this.quantity = quantity;
    // });


    // this.quantity = this.quantityService.getQuantity();

    this.quantity = this.quantityService.getQuantity();

    if (this.productId !== null) {
      this.productService.getProductById(this.productId).subscribe(
        (product) => {
          this.orderItem = product;
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

  onSubmit() {
    if (this.checkoutForm.valid) {
      // Handle form submission and payment method selection
      const formData = this.checkoutForm.value;
      Swal.fire({
        title: 'Success',
        text: 'Your order has been placed with data DEBUG: ' + JSON.stringify(formData, null,2 ),
        icon: 'success',
        confirmButtonText: 'OK'
      }).then
      (result => {
        if (result.isConfirmed && formData.paymentMethod == 'paypal') {
          Swal.fire({
            title: 'Opening paypal payment page...',
            text: 'Navigating to paypal payment page...',
            icon: 'info',
            confirmButtonText: 'OK'
          }).then
          (result => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Success',
                text: 'This condition is after payment has been made \n Booking success!!!',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then
              (result => {
                if (result.isConfirmed) {
                  this.router.navigate(['/customer/payment-history']);
                }
              })
            }
          })
        }
        else if (result.isConfirmed && formData.paymentMethod == 'creditcard') {
          Swal.fire({
            title: 'Opening credit card payment page...',
            text: 'Navigating to credit card payment page...',
            icon: 'info',
            confirmButtonText: 'OK'
          }).then
          (result => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Success',
                text: 'This condition is after payment has been made \n Booking success!!!',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then
              (result => {
                if (result.isConfirmed) {
                  this.router.navigate(['/customer/payment-history']);
                }
              })
            }
          })
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'Please select payment method',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      })
    }
    else{
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all the required fields',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

}
