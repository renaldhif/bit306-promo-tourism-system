import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cruise',
  templateUrl: './cruise.component.html',
  styleUrls: ['./cruise.component.css']
})
export class CruiseComponent {
  isLoading = false;
  inputPlaceholder: string = 'Bali tour package';

  productListAPI: any[] = [];
  productListFiltered: any[] = [];

  // productForm: FormGroup;
  searchTerm: string = '';
  sortOptionSelected: string = 'current';

  constructor(
    private router: Router,
    private productService: ProductService,
    // private formBuilder: FormBuilder
  ) {
    this.fetchProductsFromAPI();
    // this.productForm = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   price: ['', Validators.required],
    // });
  }

  ngOnInit(): void {
    // this.fetchProductsFromAPI();
    this.productListFiltered = this.productListAPI || [];
  }

  fetchProductsFromAPI() {
    this.isLoading = true;
    this.productService.getProductsByCategory('Cruise').subscribe(
      (products: any[]) => {
        // from API
        this.productListAPI = products;
        console.log("🚀 ~ file: cruise.component.ts:46 ~ CruiseComponent ~ fetchProductsFromAPI ~ this.productListAPI:", this.productListAPI)
        // filtered
        this.productListFiltered = products;
        console.log("🚀 ~ file: cruise.component.ts:49 ~ CruiseComponent ~ fetchProductsFromAPI ~ this.productListFiltered:", this.productListFiltered)

        // ! DEBUG:
        console.log('DEBUG fetchProductsFromAPI Merchant Name:', this.productListAPI[0].merchant.fullname);

        this.isLoading = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
        console.error('Error fetching products:', error);
      }
    );
  }

  onSearch() {
    // Apply search
    console.log("Current Search Term: ", this.searchTerm);
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.productListFiltered = this.productListAPI.filter((product) =>
        product.title.toLowerCase().includes(searchTermLower)
      );
    } else {
      // reset to productListAPI if searchTerm is empty
      this.productListFiltered = [...this.productListAPI];
    }

    // Apply filter
    // if (this.selectedFilterOption !== 'all') {
    //   this.productListFiltered = this.productListFiltered.filter(
    //     (product) => product.category === this.selectedFilterOption
    //   );
    // }

    // Apply sort
    // switch (this.sortOptionSelected) {
    //   case 'highest-price':
    //     this.productListFiltered.sort((a, b) => a.price - b.price);
    //     break;
    //   case 'lowest-price"':
    //     this.productListFiltered.sort((a, b) => b.price - a.price);
    //     break;
    //   case 'lowest-rating':
    //     this.productListFiltered.sort((a, b) => a.rating - b.rating);
    //     break;
    //   case 'highest-rating':
    //     this.productListFiltered.sort((a, b) => b.rating - a.rating);
    //     break;
    //   default:
    //     // If 'default' is selected, no additional sorting is needed
    //     break;
    // }
  }

  sortProducts() {
    switch (this.sortOptionSelected) {
      // case 'current':
      //   this.productListFiltered = this.productListAPI;
      //   break;
      case 'lowest-price':
        this.productListFiltered.sort((a, b) => a.price - b.price);
        break;
      case 'highest-price':
        this.productListFiltered.sort((a, b) => b.price - a.price);
        break;
      case 'lowest-rating':
        this.productListFiltered.sort((a, b) => a.rating - b.rating);
        break;
      case 'highest-rating':
        this.productListFiltered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // this.productListFiltered = this.productListFiltered;
        break;
    }
  }

}
