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

  productId: number | null;
  product: any;
  destinationsKeys: string[] = [];
  reviews: any[] = [];
  includes: string[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? parseInt(idParam, 10) : null;
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
