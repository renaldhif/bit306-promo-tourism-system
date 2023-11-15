import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  // dummy data for products
  productsDummy = [
    {
      id: 1,
      name: '7 Days 6 Nights Bali & Lombok',
      description: 'With this 7 days 6 nights Bali & Lombok tour package, you will visit the most popular tourist destinations in Bali and Lombok. These two islands are the most popular tourist destinations in Indonesia that are often visited by tourists from all over the world. In Bali, you will visit Kuta Beach, Tanah Lot Temple, Uluwatu Temple, Ubud, Kintamani, and Tegalalang. Meanwhile, in Lombok, you will visit Gili Trawangan, Gili Meno, and Gili Air.',
      price: 123456789,
      status: 'active',
      merchant : {
        id: 1,
        name: 'Bali Agung Tours',
        description: 'Bali Agung Tours is a local tour operator in Bali. Lorem Ipsum dolor sit amet.',
        phone: '08123456789',
        email: 'baliagungtours@gmail.com',
        status: 'verified',
      },
      created_at: '2023-11-12T19:58:56+08:00',
    },
    {
      id: 1,
      name: '7 Days 6 Nights Bali & Lombok',
      description: 'With this 7 days 6 nights Bali & Lombok tour package, you will visit the most popular tourist destinations in Bali and Lombok. These two islands are the most popular tourist destinations in Indonesia that are often visited by tourists from all over the world. In Bali, you will visit Kuta Beach, Tanah Lot Temple, Uluwatu Temple, Ubud, Kintamani, and Tegalalang. Meanwhile, in Lombok, you will visit Gili Trawangan, Gili Meno, and Gili Air.',
      price: 2000000,
      status: 'active',
      merchant : {
        id: 1,
        name: 'Bali Agung Tours',
        description: 'Bali Agung Tours is a local tour operator in Bali. Lorem Ipsum dolor sit amet.',
        phone: '08123456789',
        email: 'baliagungtours@gmail.com',
        status: 'verified',
      },
      created_at: '2023-11-12T19:58:56+08:00',
    },
    {
      id: 1,
      name: '7 Days 6 Nights Bali & Lombok',
      description: 'With this 7 days 6 nights Bali & Lombok tour package, you will visit the most popular tourist destinations in Bali and Lombok. These two islands are the most popular tourist destinations in Indonesia that are often visited by tourists from all over the world. In Bali, you will visit Kuta Beach, Tanah Lot Temple, Uluwatu Temple, Ubud, Kintamani, and Tegalalang. Meanwhile, in Lombok, you will visit Gili Trawangan, Gili Meno, and Gili Air.',
      price: 4500000,
      status: 'active',
      merchant : {
        id: 1,
        name: 'Bali Agung Tours',
        description: 'Bali Agung Tours is a local tour operator in Bali. Lorem Ipsum dolor sit amet.',
        phone: '08123456789',
        email: 'baliagungtours@gmail.com',
        status: 'verified',
      },
      created_at: '2023-11-12T19:58:56+08:00',
    },
    {
      id: 1,
      name: '7 Days 6 Nights Bali & Lombok',
      description: 'With this 7 days 6 nights Bali & Lombok tour package, you will visit the most popular tourist destinations in Bali and Lombok. These two islands are the most popular tourist destinations in Indonesia that are often visited by tourists from all over the world. In Bali, you will visit Kuta Beach, Tanah Lot Temple, Uluwatu Temple, Ubud, Kintamani, and Tegalalang. Meanwhile, in Lombok, you will visit Gili Trawangan, Gili Meno, and Gili Air.',
      price: 2000000,
      status: 'active',
      merchant : {
        id: 1,
        name: 'Bali Agung Tours',
        description: 'Bali Agung Tours is a local tour operator in Bali. Lorem Ipsum dolor sit amet.',
        phone: '08123456789',
        email: 'baliagungtours@gmail.com',
        status: 'verified',
      },
      created_at: '2023-11-12T19:58:56+08:00',
    },
    {
      id: 1,
      name: '7 Days 6 Nights Bali & Lombok',
      description: 'With this 7 days 6 nights Bali & Lombok tour package, you will visit the most popular tourist destinations in Bali and Lombok. These two islands are the most popular tourist destinations in Indonesia that are often visited by tourists from all over the world. In Bali, you will visit Kuta Beach, Tanah Lot Temple, Uluwatu Temple, Ubud, Kintamani, and Tegalalang. Meanwhile, in Lombok, you will visit Gili Trawangan, Gili Meno, and Gili Air.',
      price: 2000000,
      status: 'active',
      merchant : {
        id: 1,
        name: 'Bali Agung Tours',
        description: 'Bali Agung Tours is a local tour operator in Bali. Lorem Ipsum dolor sit amet.',
        phone: '08123456789',
        email: 'baliagungtours@gmail.com',
        status: 'verified',
      },
      created_at: '2023-11-12T19:58:56+08:00',
    },
  ];


  // Swal
  onAddProduct = () => {
    Swal.fire({
      title: 'Add product?',
      text: 'Coming soon :)',
      confirmButtonColor: '#4ade80'
    })
  }

  onViewInfoProduct = () => {
    Swal.fire({
      title: 'View info product?',
      text: 'Directing to view info product page or modal? Coming soon :)',
      confirmButtonColor: '#4ade80'
    })
  }

  onEditProduct = () => {
    Swal.fire({
      title: 'Edit Product?',
      text: 'Directing to edit product page or modal? Coming soon :)',
      confirmButtonColor: '#4ade80'
    })
  }

  onDeleteProduct = () => {
    Swal.fire({
      title: 'Delete product?',
      text: 'Are you sure want to delete this product? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Product has been deleted.',
            'success'
          )
        }
    })
  }

}
