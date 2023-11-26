import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/service/product-service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  productList: any[] = [];

  constructor(private router:Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.productList = this.productService.getAllProducts();
  }

  goToProductDetail (productID: number) {
    this.router.navigate(['/product', productID]);
  }

  buyNow (productID: number) {
    Swal.fire({
      title: 'Navigate to detail product',
      text: `Item ${productID}`,
    });
  }

}
