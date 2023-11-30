import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class MerchantService {

  // Will be replaced with actual API call
    merchantsDummy = [
      {
        id: 1,
        name: 'Yogyakarta Wisata Jaya',
        address: 'Jl. Kaliurang No. 1, Yogyakarta',
        phone: '08123456786',
        email: 'jogjawisata@gmail,com',
        description: 'Yogyakarta Wisata Jaya is a travel agent that provides tour packages to Yogyakarta. We have been in this business for more than 10 years.',
        status: 'pending',
        document: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf',
        documentName: 'Yogyakarta Wisata Jaya.pdf',
        documentDescription: 'Company Profile Yogyakarta Wisata Jaya',
        created_at: '2023-11-22T11:43:25.000Z'
      },
      {
        id: 2,
        name: 'Fantastic Tour',
        address: 'Jl. Sudirman No. 1, Jakarta',
        phone: '08123456784',
        email: 'fantastictour@gmail,com',
        description: 'Fantastic Tour is a travel agent that provides tour packages to Jakarta. We have been in this business for more than 10 years.',
        status: 'verified',
        document: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf',
        documentName: 'Fantastic Tour.pdf',
        documentDescription: 'Company Profile Fantastic Tour',
        created_at: '2023-11-22T11:43:25.000Z',
      },
      {
        id: 3,
        name: 'Bali Wisata Jaya',
        address: 'Jl. Raya Kuta No. 1, Kuta, Bali',
        phone: '08123456789',
        email: 'baj@gmail.com',
        description: 'Bali Wisata Jaya is a travel agent that provides tour packages to Bali. We have been in this business for more than 10 years.',
        status: 'rejected',
        document: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf',
        documentName: 'Bali Wisata Jaya.pdf',
        documentDescription: 'Company Profile Bali Wisata Jaya',
        created_at: '2023-11-22T11:43:25.000Z',
      },
      {
        id: 4,
        name: 'Fantastic Tour',
        address: 'Jl. Sudirman No. 1, Jakarta',
        phone: '08123456784',
        email: 'fantastictour@gmail,com',
        description: 'Fantastic Tour is a travel agent that provides tour packages across Asia. We have been in this business for more than 10 years.',
        status: 'pending',
        document: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf',
        documentName: 'Fantastic Tour.pdf',
        documentDescription: 'Company Profile Fantastic Tour',
        created_at: '2023-11-22T11:43:25.000Z',
      },
      {
        id: 5,
        name: 'Fantastic Tour',
        address: 'Jl. Sudirman No. 1, Jakarta',
        phone: '08123456784',
        email: 'fantastictour@gmail,com',
        description: 'Fantastic Tour is a travel agent that provides tour packages across Asia. We have been in this business for more than 10 years.',
        status: 'verified',
        document: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf',
        documentName: 'Fantastic Tour.pdf',
        documentDescription: 'Company Profile Fantastic Tour',
        created_at: '2023-11-22T11:43:25.000Z',
      },
  ];

  constructor() {}

  getAllMerchants() {
    return this.merchantsDummy;
  }

  getMerchantById(id: Number | null) {
    return this.merchantsDummy.find((merchant) => merchant.id == id);
  }

}
