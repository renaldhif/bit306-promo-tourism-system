import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package-tour',
  templateUrl: './package-tour.component.html',
  styleUrls: ['./package-tour.component.css']
})
export class PackageTourComponent {
  isLoading = false;
  inputPlaceholder: string = 'Bali tour package';

  productListAPI: any[] = [];
  productListFiltered: any[] = [];

  // productForm: FormGroup;
  searchTerm: string = '';
  sortOptionSelected: string = 'current';

  constructor(
    private productService: ProductService,
  ) {
    this.fetchProductsFromAPI();
  }

  ngOnInit(): void {
    // this.fetchProductsFromAPI();
    this.productListFiltered = this.productListAPI || [];
  }

  fetchProductsFromAPI() {
    this.isLoading = true;
    //TODO: Get "PACKAGE TOUR" CATEGORY from backend API
    this.productService.getAllProducts().subscribe(
      (products: any[]) => {
        // from API
        this.productListAPI = products;
        console.log("🚀 ~ file: attraction-entertainment.component.ts:47 ~ AttractionEntertainmentComponent ~ fetchProductsFromAPI ~ this.productListAPI:", this.productListAPI)
        // filtered
        this.productListFiltered = products;
        console.log("🚀 ~ file: attraction-entertainment.component.ts:50 ~ AttractionEntertainmentComponent ~ fetchProductsFromAPI ~ this.productListFiltered:", this.productListFiltered)

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
