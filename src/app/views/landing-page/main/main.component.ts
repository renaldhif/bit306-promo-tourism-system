import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private router:Router) {}

  productsDummy = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
      price: 100,
      image: 'https://fakeimg.pl/300x150',
      merchant: {
        id: 1,
        name: 'Merchant 1',
        address: 'Address 1',
        phone: '08123456789',
        email: 'merchant1@gmail.com',
      },
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
      price: 200,
      image: 'https://fakeimg.pl/300x150',
      merchant: {
        id: 2,
        name: 'Merchant 2',
        address: 'Address 2',
        phone: '08123456789',
        email: 'merchant2@gmail.com',
      },
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
      price: 300,
      image: 'https://fakeimg.pl/300x150',
      merchant: {
        id: 3,
        name: 'Merchant 3',
        address: 'Address 3',
        phone: '08123456789',
        email: 'merchant3@gmail.com',
      },
    },
    {
      id: 4,
      title: 'Product 4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
      price: 400,
      image: 'https://fakeimg.pl/300x150',
      merchant: {
        id: 4,
        name: 'Merchant 4',
        address: 'Address 4',
        phone: '08123456789',
        email: 'merchant4@gmail.com',
      },
    },
    {
      id: 5,
      title: 'Product 5',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
      price: 500,
      image: 'https://fakeimg.pl/300x150',
      merchant: {
        id: 5,
        name: 'Merchant 5',
        address: 'Address 5',
        phone: '08123456789',
        email: 'merchant5@gmail.com',
      },
    },
  ];

  goToProductDetail (productID: number) {
    this.router.navigate(['/product', productID]);
  }

  buyNow (productID: number) {
    Swal.fire({
      title: 'Navigate to detail product',
      text: `Item ${productID}`,
    });
  }

}
