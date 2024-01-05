import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  products: any[] = [];

  constructor(private router: Router, private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    // Fetch products from the service
    const userId = this.authService.getUserId();
    if (userId) {
      this.productService.getProductsByMerchant(userId).subscribe({
        next: (data) => {
          this.products = data;
          this.dtTrigger.next(null as any); // Trigger DataTables update
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); // Unsubscribe from DataTables
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

  onDeleteProduct = (productId: number) => {
    Swal.fire({
      title: 'Delete product?',
      text: 'Are you sure you want to delete this product? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deleteProduct method and handle the deletion logic
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            // Update the products list after successful deletion
            // You may want to fetch the updated list from the server again
            this.products = this.products.filter(product => product.id !== productId);
            Swal.fire('Deleted!', 'Product has been deleted.', 'success').then(() => {
              // Reload the entire page
              location.reload();
            });
          },
          error: (error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error!', 'Something went wrong while deleting the product.', 'error');
          }
        });
      }
    });
  }
}
