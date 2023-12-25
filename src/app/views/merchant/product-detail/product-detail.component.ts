import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  productId: string | null;
  product: any;
  destinationsKeys: string[] = [];
  reviews: any[] = [];
  includes: string[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    // this.productId = idParam ? parseInt(idParam, 10) : null;
    this.productId = idParam;
  }

  ngOnInit(): void {
    if (this.productId !== null) {
      this.product = this.productService.getProductById(this.productId);
      this.destinationsKeys = Object.keys(this.product.destinations);
      this.reviews = Object.values(this.product.reviews);
      this.includes = Object.values(this.product.includes);
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

