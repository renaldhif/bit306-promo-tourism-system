import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  productId: string | null;
  product: any; // Replace 'any' with your actual product model/interface

  constructor(private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('id');
    // Fetch product details based on productId (you can use this.productId)
    // For now, use dummy data or fetch from your existing data source
    this.product = {
      id: this.productId,
      title: `Product ${this.productId}`,
      description: 'a product',
      // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl. v v Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl.',
      price: 100,
      image: 'https://fakeimg.pl/300x150',
      merchant: {
        id: 1,
        name: 'Merchant 1',
        address: 'Address 1',
        phone: '08123456789',
        email: 'merchant1@gmail.com',
        description: 'Merchant 1 is merchant that provides the best package tours in the world.'
      },
    };
  }
}
