import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private router: Router, private productService: ProductService) {}
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  // data from productService
  products = this.productService.getAllProducts();

  // Swal
  onAddProduct = () => {
    Swal.fire({
      title: 'Add product?',
      text: 'Coming soon :)',
      confirmButtonColor: '#4ade80'
    })
  }

  onViewInfoProduct = (productId: number) => {
    // Swal.fire({
    //   title: 'View info product?',
    //   text: 'Directing to view info product page or modal? Coming soon :)',
    //   confirmButtonColor: '#4ade80'
    // })

    // direct to view info product page
    this.router.navigate(['/merchant/view-product-detail', productId]);
  }

  onEditProduct = (productId: number) => {
    // Swal.fire({
    //   title: 'Edit Product?',
    //   text: 'Directing to edit product page or modal? Coming soon :)',
    //   confirmButtonColor: '#4ade80'
    // })

    // direct to edit product page and pass the item.id
    this.router.navigate(['/merchant/edit-product', productId]);
  }

  onDeleteProduct = () => {
    Swal.fire({
      title: 'Delete product?',
      text: 'Are you sure want to delete this product? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Product has been deleted.',
            'success'
          )
        }
    })
  }

}
