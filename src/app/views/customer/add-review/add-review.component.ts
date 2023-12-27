import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  ratingForm: FormGroup;
  selectedRating: number = 0;
  ratingDescription: string = '';
  orderId: string = '';

  //TODO: change to order
  product: any;


  //TODO: add order id to the constructor
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    this.ratingForm = this.fb.group({
      rating: [null,[Validators.required]],
      comments: [''],
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    this.orderId = idParam ? idParam : '';
  }

  idParam = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getProductDetails(this.idParam!);
  }

  onRatingChange() {
    this.ratingForm.get('rating')?.setValue(this.selectedRating);
    this.setRatingDescription(this.selectedRating);

    console.log(this.ratingForm.value);
  }

  get rating() {
    return this.ratingForm.get('rating');
  }

  get comments() {
    return this.ratingForm.get('comments');
  }

  // get star rating description
  switchRatingDescription(rating: number) {
    switch (rating) {
      case 0:
        return '';
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  }

  setRatingDescription(rating: number) {
    this.ratingDescription = this.switchRatingDescription(rating);
  }

  //TODO: change this to getOrderDetail instead of getProductDetail
  getProductDetails(id: string): void {
    this.productService.getProductById(id).subscribe(
      product => {
        // Do something with the product details here
        this.product = product;
        console.log("🚀 ~ file: add-review.component.ts:90 ~ AddReviewComponent ~ getProductDetails ~ product:", product)
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  onSubmit() {
    console.log(JSON.stringify(this.ratingForm.value,null,2));
    // thankyou message
    Swal.fire({
      title: 'Thank you!',
      text: 'Your review has been submitted successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/customer/payment-history']);
      }
    })
  }
}
