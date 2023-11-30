import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class PaymentService {

  // Will be replaced with actual API call
  paymentsDummy = [
    {
      id: 1,
      paymentMethod: "paypal",
      status: "Paid",
      totalAmount: 600,
      date_created: '2023-11-22T11:43:25.000Z',
      quantity: 3,
      notes: 'Please provide a tour guide who can speak English fluently.',
      customer: {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '08123456789',
      },
      product: {
        id: 1,
        title: 'Jogja Trip 3 Days 2 Nights',
        description: 'This package will take you to the most beautiful places in Jogja. It includes a visit to the famous Borobudur Temple, Malioboro Street, and many more. This trip will be guided by a professional tour guide. It also includes a 2-night stay at a 4-star hotel.',
        price: 200,
        category: 'Tour package',
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
      }
    },

    {
      id: 2,
      paymentMethod: "creditcard",
      status: "Waiting",
      totalAmount: 185,
      date_created: '2023-11-22T11:43:25.000Z',
      quantity: 10,
      notes: 'Please provide extra towel.',
      customer: {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '08123456789',
      },
      product: {
        id: 2,
        title: 'Atlantis Water Adventure Ancol',
        description: 'Atlantis Ancol is a water playground at the famous Taman Impian Jaya Ancol. Atlantis is one of the water parks in Jakarta and offers a variety of fun and exciting water activities for families. It has a variety of pools, a thrilling air slide, and a pool for children to play in. Atlantis Ancol has become a favorite place for Jakartans for holidays, an ideal place to spend exciting time with family and friends. Race with friends on the Dragon Slide, test your nerves on the Skybox slide, and relax while floating in the lazy river.',
        price: 18.5,
        category: 'Attraction & Entertainment',
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
          id: 2,
          name: 'Fantastic Tour',
          address: 'Jl. Sudirman No. 1, Jakarta',
          phone: '08123456784',
          email: 'fantastictour@gmail,com',
          description: 'Fantastic Tour is a travel agent that provides tour packages to Jakarta. We have been in this business for more than 10 years.',
        },
      }
    },

    {
      id: 3,
      paymentMethod: "creditcard",
      status: "Failed",
      totalAmount: 1500,
      date_created: '2023-11-22T11:43:25.000Z',
      quantity: 5,
      notes: 'Please provide a tour guide who can speak English fluently.',
      customer: {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '08123456789',
      },
      product: {
        id: 3,
        title: 'Bali 3 Days Happy Trip',
        description: 'This package will take you to the most beautiful places in Bali. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatibus.',
        price: 300,
        category: 'Tour package',
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
      }
    }


  ];

  constructor() {}

  getAllPayments = () => {
    if (this.paymentsDummy.length > 0) {
      return this.paymentsDummy;
    }
    else{
      return null;
    }
  }

  getPaymentById = (id: number | null) => {
    return this.paymentsDummy.find((payment) => payment.id === id);
  };


}
