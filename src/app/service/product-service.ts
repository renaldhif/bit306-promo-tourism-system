import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class ProductService {

  // Will be replaced with actual API call
    productsDummy = [
      {
        id: 1,
        title: 'Jogja Trip 3 Days 2 Nights',
        description: 'This package will take you to the most beautiful places in Jogja. It includes a visit to the famous Borobudur Temple, Malioboro Street, and many more. This trip will be guided by a professional tour guide. It also includes a 2-night stay at a 4-star hotel.',
        price: 200,
        category: 'Tour package',
        rating: 3.5,
        ratingQty: 10,
        tripDays: 3,
        location: 'Yogyakarta, Indonesia',
        destinations:{
          destination1: 'Borobudur Temple',
          destination2: 'Malioboro Street',
          destination3: 'Keraton Yogyakarta',
        },
        includes: {
          include1: 'Hotel',
          include2: 'Transportation',
          include3: 'Tour guide',
          include4: 'Meals',
        },
        image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        merchant: {
          id: 1,
          name: 'Yogyakarta Wisata Jaya',
          address: 'Jl. Kaliurang No. 1, Yogyakarta',
          phone: '08123456786',
          email: 'jogjawisata@gmail,com',
          description: 'Yogyakarta Wisata Jaya is a travel agent that provides tour packages to Yogyakarta. We have been in this business for more than 10 years.',
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
        created_at: '2023-11-22T11:43:25.000Z',
      },

      {
        id: 2,
        title: 'Atlantis Water Adventure Ancol',
        description: 'Atlantis Ancol is a water playground at the famous Taman Impian Jaya Ancol. Atlantis is one of the water parks in Jakarta and offers a variety of fun and exciting water activities for families. It has a variety of pools, a thrilling air slide, and a pool for children to play in. Atlantis Ancol has become a favorite place for Jakartans for holidays, an ideal place to spend exciting time with family and friends. Race with friends on the Dragon Slide, test your nerves on the Skybox slide, and relax while floating in the lazy river.',
        price: 18.5,
        category: 'Attraction & Entertainment',
        rating: 4,
        ratingQty: 20,
        tripDays: 1,
        location: 'Jakarta, Indonesia',
        destinations:{
          destination1: 'Atlantis Water Adventure Ancol',
        },
        includes: {
          include1: 'Access ticket',
        },
        image: 'https://www.ancol.com/shared/images/5d3f526e-5729-4af1-8d31-5072bd832270.png',
        merchant: {
          id: 1,
          name: 'Fantastic Tour',
          address: 'Jl. Sudirman No. 1, Jakarta',
          phone: '08123456784',
          email: 'fantastictour@gmail,com',
          description: 'Fantastic Tour is a travel agent that provides tour packages to Jakarta. We have been in this business for more than 10 years.',
        },
        reviews: [
          {
            id: 1,
            rating: 4,
            comment: 'The water park was very fun. The slides were very exciting. I would definitely recommend this package to my friends.',
            user: {
              id: 3,
              name: 'Diani Chandra',
              email: 'chandradiani@gmail.com',
            },
            dateCreated: '2023-11-22T11:43:25.000Z'
          },
        ],
        created_at: '2023-11-22T11:43:25.000Z',
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
        image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        created_at: '2023-11-22T11:43:25.000Z',
      },

      {
        id: 4,
        title: 'Lembang Park and Zoo',
        description: 'Lembang Park and Zoo is a zoo in Bandung which has various attractions and activities that children will like. It has an area of 25 hectares and is located in a hilly area, making the location feel cool. This zoo has a variety of animals that can be seen up close, ranging from tigers, ostriches, kangaroos and other fauna.',
        price: 40.71,
        category: 'Attraction & Entertainment',
        rating: 3.8,
        ratingQty: 12,
        tripDays: 1,
        location: 'Bandung, Indonesia',
        destinations:{
          destination1: 'Lembang Park and Zoo',
        },
        includes: {
          include1: 'Access ticket',
          include2: 'Access to Big Aviary',
          include3: 'Animal food',
        },
        image: 'https://assets-a1.kompasiana.com/items/album/2023/04/04/20230401-102912-642baf4108a8b562b51b4f93.jpg',
        merchant: {
          id: 1,
          name: 'Fantastic Tour',
          address: 'Jl. Sudirman No. 1, Jakarta',
          phone: '08123456784',
          email: 'fantastictour@gmail,com',
          description: 'Fantastic Tour is a travel agent that provides tour packages across Asia. We have been in this business for more than 10 years.',
        },
        reviews: [
          {
            id: 3,
            rating: 4,
            comment: 'The lembang park and zoo was very fun. The animals were very cute. I would definitely recommend this package to my friends.',
            user: {
              id: 3,
              name: 'Diani Chandra',
              email: 'chandradiani@gmail.com',
            },
            dateCreated: '2023-11-22T11:43:25.000Z'
          },
        ],
        created_at: '2023-11-22T11:43:25.000Z',
      },

      {
        id: 5,
        title: '3D Genting Dream Cruise',
        description: 'The Genting Dream Cruise is a cruise ship that offers a variety of fun activities for the whole family. It has a water park, a casino, a cinema, and many more. This package includes a 3-night stay at the cruise ship.',
        price: 844.46,
        category: 'Cruise',
        rating: 4.2,
        ratingQty: 5,
        tripDays: 3,
        location: 'Singapore',
        destinations:{
          destination1: 'Singapore',
          destination2: 'Malaysia',
          destination3: 'Singapore',
        },
        includes: {
          include1: 'Cruise ticket',
          include2: 'Meals',
          include3: 'Access to cinema',
        },
        image: 'https://asset-2.tstatic.net/jakarta/foto/bank/images/genting-dream-cruise_20180404_163703.jpg',
        merchant: {
          id: 1,
          name: 'Fantastic Tour',
          address: 'Jl. Sudirman No. 1, Jakarta',
          phone: '08123456784',
          email: 'fantastictour@gmail,com',
          description: 'Fantastic Tour is a travel agent that provides tour packages across Asia. We have been in this business for more than 10 years.',
        },
        reviews: [
          {
            id: 4,
            rating: 4,
            comment: 'The cruise was beautiful. The food was delicious. I would definitely recommend this package to my friends.',
            user: {
              id: 4,
              name: 'Renaldhi Fahrezi',
              email: 'renaldhifahrezi@gmail.com',
            },
            dateCreated: '2023-11-22T11:43:25.000Z'
          },
        ],
        created_at: '2023-11-22T11:43:25.000Z',
      },
  ];

  constructor() {}

  getAllProducts() {
    return this.productsDummy;
  }

  getProductById(id: Number | null) {
    return this.productsDummy.find((product) => product.id == id);
  }

  // simplified product object for user orders
  getUserOrderProduct(productId: number | null) {
    const product = this.getProductById(productId);

    if (product) {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        location: product.location,
        image: product.image,
        merchant: {
          id: product.merchant.id,
          name: product.merchant.name,
          phone: product.merchant.phone,
          email: product.merchant.email,
        }
      };
    }
    // Return null if the product is not found
    return null;
  }


}
