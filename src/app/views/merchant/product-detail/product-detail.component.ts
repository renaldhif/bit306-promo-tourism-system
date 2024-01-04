import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import { ReviewService } from 'src/app/service/review.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../../env/dev.environtment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: string | null;
  product: any;
  destinationsKeys: string[] = [];
  reviews: any[] = [];
  includes: string[] = [];
  isReviewEmpty: boolean = true;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam;
  }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.productId !== null) {
      this.productService.getProductById(this.productId).subscribe(
        (product) => {
          this.product = product;
          this.destinationsKeys = Object.keys(this.product.destinations);

          // Fetch reviews using getReviewDetail from ReviewService
          this.reviews = [];
          let reviewCount = product.reviews.length;

          if (reviewCount === 0) {
            this.isReviewEmpty = true;
          }

          product.reviews.forEach((reviewId: string) => {
            this.reviewService.getReviewDetail(reviewId).subscribe(
              (review) => {
                this.reviews.push(review);
                // Check if all reviews have been fetched
                if (this.reviews.length === reviewCount) {
                  this.isReviewEmpty = false;
                }
                this.isLoading = false;
              },
              (error) => {
                this.isLoading = false;
                console.error('Error fetching review details:', error);
              }
            );
          });
          this.isLoading = false;
          this.includes = Object.values(this.product.includes);
        },
        (error) => {
          this.isLoading = false;
          console.error('Error fetching product details:', error);
        }
      );
    } else {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
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
      const baseURL = environment.apiUrl;
      return baseURL + imagePath;
    }
  }
}
