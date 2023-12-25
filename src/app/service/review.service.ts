import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'env/environtment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get reviews by product ID
  getReviewsByProduct(productId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/api/reviews/product/${productId}`);
  }

  // Get review details by ID
  getReviewDetail(reviewId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/api/reviews/${reviewId}`);
  }

   // Get review details by ID along with user details
  //  getReviewDetail(reviewId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/api/reviews/${reviewId}`).pipe(
  //     mergeMap(review => {
  //       // Check if the review has a user
  //       if (review.user) {
  //         // Fetch user details
  //         return this.userService.getUserDetails(review.user.$oid).pipe(
  //           map(userDetails => {
  //             console.log('User Details:', userDetails); // Log user details
  //             return {
  //               ...review,
  //               user: userDetails
  //             };
  //           })
  //         );
  //       } else {
  //         // If there is no user in the review, return the original review
  //         return [review];
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching review details:', error);
  //       throw error;
  //     })
  //   );
  // }
}