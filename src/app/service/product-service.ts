import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, mergeMap } from "rxjs";
import { environment } from "env/dev.environtment";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { ReviewService } from "./review.service";

@Injectable({
  providedIn: "root",
})

export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService
  ) { }

  // constructor() {}

  // getAllProducts() {
  //   return this.productsDummy;
  // }

  // getProductById(id: Number | null) {
  //   return this.productsDummy.find((product) => product.id == id);
  // }

  // // simplified product object for user orders
  // getUserOrderProduct(productId: number | null) {
  //   const product = this.getProductById(productId);

  //   if (product) {
  //     return {
  //       id: product.id,
  //       title: product.title,
  //       description: product.description,
  //       price: product.price,
  //       category: product.category,
  //       location: product.location,
  //       image: product.image,
  //       merchant: {
  //         id: product.merchant.id,
  //         name: product.merchant.name,
  //         phone: product.merchant.phone,
  //         email: product.merchant.email,
  //       }
  //     };
  //   }
  //   // Return null if the product is not found
  //   return null;
  // }

  // ProductService

  // getAllProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/api/products`)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error fetching products:', error);
  //         // Handle the error, e.g., return an empty array or re-throw the error
  //         return [];
  //       })
  //     );
  // }


  // getAllProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/api/products/`).pipe(
  //     map((products: any[]) =>
  //      products.map(product => ({
  //       ...product,
  //       merchant: this.userService.getUserDetails(product.merchant),
  //     }))),
  //     catchError(error => {
  //       console.error('Error fetching products:', error);
  //       throw error;
  //     })
  //   );
  // }

  //! JANGAN BUAT DIA AUTHENTICATED. MUNGKIN BISA DIBUAT PAKE DATABASE TERPISAH.

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/products/`).pipe(
      mergeMap((products: any[]) => {
        const merchantRequests = products.map(product =>
          this.userService.getUserDetails(product.merchant).pipe(
            map(merchantDetails => {
              console.log('Merchant Details:', merchantDetails); // Log merchant details
              return {
                ...product,
                merchant: merchantDetails
              };
            })
          )
        );
        return forkJoin(merchantRequests);
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        throw error;
      })
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/products/${id}`).pipe(
      mergeMap(product => {
        return this.userService.getUserDetails(product.merchant).pipe(
          map(merchantDetails => {
            console.log('Merchant Details:', merchantDetails); // Log merchant details
            return {
              ...product,
              merchant: merchantDetails
            };
          })
        );
      }),
      catchError(error => {
        console.error('Error fetching product details:', error);
        throw error;
      })
    );
  }

  // getProductById(id: string): Observable<any> {
  //   console.log('Product ID in service:', id); // Log product ID
  //   return this.http.get<any>(`${this.apiUrl}/api/products/${id}`).pipe(
  //     mergeMap(product => {
  //       // Fetch merchant details
  //       const merchantDetails$ = this.userService.getUserDetails(product.merchant);

  //       // Fetch reviews associated with the product
  //       const reviews$ = this.reviewService.getReviewsByProduct(id);

  //       // Combine the observables using forkJoin
  //       return forkJoin({
  //         product: merchantDetails$,
  //         reviews: reviews$
  //       }).pipe(
  //         map(({ product, reviews }) => {
  //           console.log('Merchant Details:', product.merchant); // Log merchant details
  //           console.log('Reviews:', reviews); // Log reviews
  //           return {
  //             ...product,
  //             merchant: product.merchant,
  //             reviews: reviews
  //           };
  //         })
  //       );
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching product details:', error);
  //       throw error;
  //     })
  //   );
  // }

  createProduct(productData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/products/`, productData);
  }

  updateProduct(id: string, updatedProductData: FormData): Observable<any> {
    console.log('updatedProductData: ' + updatedProductData.get('destination'));
    return this.http.patch<any>(`${this.apiUrl}/api/products/${id}`, updatedProductData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/products/${id}`);
  }

  getUserOrderProduct(productId: number | null): Observable<any | null> {
    return this.http.get<any>(`${this.apiUrl}/api/products/${productId}`);
  }

  getProductsByMerchant(merchantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/products/merchant/${merchantId}`);
  }

}
