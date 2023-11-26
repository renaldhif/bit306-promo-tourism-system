import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class ProductService {

  // Will be replaced with actual API call
    productsDummy = [
      {
        id: 1,
        title: 'Product 1 Lorem 1 Ipsum 1 Dolor 1 Sit 1 Amet 1 Lorem 1 Dolor 1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
        price: 100,
        category: 'package tour',
        rating: 4,
        ratingQty: 10,
        tripDays: 3,
        location: 'Jakarta',
        image: 'https://fakeimg.pl/300x150',
        merchant: {
          id: 1,
          name: 'Merchant Jakarta',
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
        category: 'package tour',
        rating: 5,
        ratingQty: 25,
        tripDays: 3,
        location: 'Denpasar, Bali',
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
        title: 'Bali 3 Days Happy Trip',
        description: 'This package will take you to the most beautiful places in Bali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
        price: 300,
        category: 'Tour package',
        rating: 5,
        ratingQty: 15,
        tripDays: 3,
        location: 'Bali',
        destinations:{
          destination1: 'Kuta Beach',
          destination2: 'Ubud Monkey Forest',
          destination3: 'Tanah Lot',
        },
        includes: {
          include1: 'Hotel',
          include2: 'Transportation',
          include3: 'Tour guide',
        },
        image: 'https://fakeimg.pl/400x400',
        merchant: {
          id: 3,
          name: 'Bali Wisata Jaya',
          address: 'Jl. Raya Kuta No. 1, Kuta, Bali',
          phone: '08123456789',
          email: 'baj@gmail.com',
          description: 'Bali Wisata Jaya is a travel agent that provides tour packages to Bali. We have been in this business for more than 10 years.',
        },
        reviews: [
          {
            id: 1,
            rating: 4,
            comment: 'I really enjoyed the trip. The tour guide was very friendly and helpful.',
            user: {
              id: 1,
              name: 'Mr. Kok Chye Hock',
              email: 'chyehock@help.edu.my',
            },
            dateCreated: '2023-11-22T11:43:25.000Z'
          },
          {
            id: 2,
            rating: 5,
            comment: 'The trip was amazing. I would definitely recommend this tour package to my friends.',
            user: {
              id: 2,
              name: 'Ms. Ng Shu Min',
              email: 'shumin@help.edu.my',
            },
            dateCreated: '2023-11-22T11:43:25.000Z'
          },
        ],
      },

      {
        id: 4,
        title: 'Product 4',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
        price: 400,
        category: 'attraction & entertainment',
        rating: 5,
        ratingQty: 20,
        tripDays: 3,
        location: 'Denpasar, Bali',
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
        category: 'attraction & entertainment',
        rating: 4,
        ratingQty: 10,
        tripDays: 3,
        location: 'Lombok, Nusa Tenngara Barat',
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

  constructor() {}

  getAllProducts() {
    return this.productsDummy;
  }

  getProductById(id: Number | null) {
    return this.productsDummy.find((product) => product.id == id);
  }

}
