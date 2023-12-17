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
  dtOptions: DataTables.Settings = {};

  products: any[] = [];  // Initialize products as an array

  constructor(private router: Router, private productService: ProductService) {}


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    // Fetch products from the service
    this.productService.getAllProducts().subscribe(
      (products: any[]) => {
        this.products = products;
      },
      error => {
        console.error('Error fetching products:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }
  // Swal
  onAddProduct = () => {
    // direct to add product page
    this.router.navigate(['/merchant/add-product']);
  }
  
  onViewInfoProduct = (productId: number) => {
    // direct to view info product page
    this.router.navigate(['/merchant/view-product-detail', productId]);
  }

  onEditProduct = (productId: number) => {
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
