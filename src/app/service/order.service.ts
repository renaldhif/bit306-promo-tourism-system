// order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, mergeMap } from 'rxjs';
import { environment } from 'env/dev.environtment';
import { ProductService } from './product-service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private productService: ProductService) { }

    // Create a new order
    createOrder(orderData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/orders`, orderData);
    }

    // Get all orders
    getAllOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/api/orders`);
    }

    // Get order by ID
    getOrderById(orderId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/orders/${orderId}`);
    }

    // Update order by ID
    updateOrder(orderId: string, updatedOrderData: any): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/api/orders/${orderId}`, updatedOrderData);
    }

    // //get order by user id
    getOrderByUserId(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/orders/user/${userId}`);
    }
    // getOrderByUserId(userId: string): Observable<any> {
    //     return this.http.get<any>(`${this.apiUrl}/api/orders/user/${userId}`).pipe(
    //       mergeMap((orders: any[]) => {
    //         const productRequests = orders.map(order =>
    //             this.productService.getProductById(order.productId).pipe(
    //                 map(productDetails => {
    //                 console.log('Product Details:', productDetails); // Log product details
    //                 return {
    //                     ...order,
    //                     product: productDetails
    //                 };
    //                 })
    //             )
    //         );
    //         console.log('Product Requests:', productRequests); // Log product requests
    //         return forkJoin(productRequests).pipe(
    //           map(products => {
    //             return {
    //               ...orders,
    //               products: products,
    //             };
    //           })
    //         );
    //       }),
    //       catchError(error => {
    //         console.error('Error fetching order details:', error);
    //         throw error;
    //       })
    //     );
    //   }
    }

