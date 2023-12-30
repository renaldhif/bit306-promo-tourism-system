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

    // Update isReviewed field by order ID
    updateOrderIsReviewed(orderId: string, isReviewed: boolean): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/api/orders/${orderId}/is-reviewed`,{ isReviewed });
    }
}
