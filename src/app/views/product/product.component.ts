import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  productId: number | null;
  product: any;
  quantity: number = 1;
  pricePerItem: number = 0;
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
      this.pricePerItem = this.product.price;
      this.destinationsKeys = Object.keys(this.product.destinations);
      this.reviews = Object.values(this.product.reviews);
      this.includes = Object.values(this.product.includes);
    }
  }

  // Calculate the total price based on quantity and price per item
  get total(): number {
    return this.quantity * this.pricePerItem;
  }

  // Increase the quantity
  incrementQuantity() {
    // limit to 99
    if (this.quantity < 99) {
      this.quantity++;
    }
  }

  // Decrease the quantity, but ensure it doesn't go below 1
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  checkoutNow() {
    Swal.fire({
      title: 'Success!',
      text: `Successfully checkout with ${this.quantity} item(s)`,
      icon: 'success',
      confirmButtonText: 'OK',
      denyButtonText: 'Cancel',
    });
  }

}
