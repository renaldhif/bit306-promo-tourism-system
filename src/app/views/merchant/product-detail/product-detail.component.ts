import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import { ReviewService } from 'src/app/service/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null;
  product: any;
  destinationsKeys: string[] = [];
  reviews: any[] = [];
  includes: string[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private reviewService: ReviewService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam;
  }

  ngOnInit(): void {
    if (this.productId !== null) {
      this.productService.getProductById(this.productId).subscribe(
        (product) => {
          this.product = product;
          this.destinationsKeys = Object.keys(this.product.destinations);

          // Fetch reviews using getReviewDetail from ReviewService
          this.reviews = [];
          console.log('product review' + JSON.stringify(product.reviews));
          product.reviews.forEach((reviewId: string) => {
            this.reviewService.getReviewDetail(reviewId).subscribe(
              (review) => {
                console.log('review' + JSON.stringify(review));
                this.reviews.push(review);
                console.log('this review' + JSON.stringify(this.reviews));
                console.log('this review' + this.reviews[0].rating);
              },
              (error) => {
                console.error('Error fetching review details:', error);
              }
            );
          });

          this.includes = Object.values(this.product.includes);
        },
        (error) => {
          console.error('Error fetching product details:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from 'src/app/service/product-service';

// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.css']
// })
// export class ProductDetailComponent implements OnInit {

//   productId: number | null;
//   product: any;
//   destinationsKeys: string[] = [];
//   reviews: any[] = [];
//   includes: string[] = [];

//   constructor(private route: ActivatedRoute, private productService: ProductService) {
//     const idParam = this.route.snapshot.paramMap.get('id');
//     this.productId = idParam ? parseInt(idParam, 10) : null;
//   }

//   // ngOnInit(): void {
//   //   if (this.productId !== null) {
//   //     // Use productService.getProductById which returns an observable
//   //     this.productService.getProductById(this.productId).subscribe(
//   //       (product) => {
//   //         this.product = product;
//   //         this.destinationsKeys = Object.keys(this.product.destinations);
//   //         this.reviews = Object.values(this.product.reviews);
//   //         this.includes = Object.values(this.product.includes);
//   //       },
//   //       (error) => {
//   //         console.error('Error fetching product details:', error);
//   //         // Handle the error, e.g., show an error message to the user
//   //       }
//   //     );
//   //   }
//   // }

//   ngOnInit(): void {
//     if (this.productId !== null) {
//       this.productService.getProductById(this.productId).subscribe(
//         (product) => {
//           if (!product) {
//             // Handle the case where the product is not found
//             console.error('Product not found.');
//             // Redirect or show an error message
//           } else {
//             this.product = product;
//             this.destinationsKeys = Object.keys(this.product.destinations);
//             this.reviews = Object.values(this.product.reviews);
//             this.includes = Object.values(this.product.includes);
//           }
//         },
//         (error) => {
//           console.error('Error fetching product details:', error);
//           // Handle the error, e.g., show an error message to the user
//         }
//       );
//     }
//   }
  

// }

