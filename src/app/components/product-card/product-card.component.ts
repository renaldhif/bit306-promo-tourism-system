import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'env/dev.environtment';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;
  productList: any[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products: any[]) => {
        this.productList = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


  goToProductDetail(productID: string) {
    this.productService.getProductById(productID).subscribe(
      (productDetails: any) => {
        this.router.navigate(['/product', productID],
          {
            state: { product: productDetails }
          });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        console.error('Error fetching product details:', error);
      }
    );
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
}
