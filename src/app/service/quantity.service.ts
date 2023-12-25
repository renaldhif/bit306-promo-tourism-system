// // quantity.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class QuantityService {
//   private quantitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
//   public quantity$: Observable<number> = this.quantitySubject.asObservable();

//   setQuantity(quantity: number): void {
//     this.quantitySubject.next(quantity);
//   }
// }

// quantity.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuantityService {
  private quantityKey = 'orderQuantity';

  setQuantity(quantity: number): void {
    localStorage.setItem(this.quantityKey, quantity.toString());
  }

  getQuantity(): number {
    const storedQuantity = localStorage.getItem(this.quantityKey);
    return storedQuantity ? +storedQuantity : 1;
  }
}
