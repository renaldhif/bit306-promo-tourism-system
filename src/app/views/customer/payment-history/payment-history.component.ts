import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent {

  paymentsDummy = [
    {
      id: 1,
      paymentID: '202311171',
      customer: {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '1234567890',
        address: '123 Main St, New York, NY 10030',
      },
      product: {
        id: 1,
        name: '5 Days trip to Bali and Lombok',
        price: 5000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet nunc. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet nunc. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet nunc. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet nunc. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet nunc. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet nunc. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. ',
        image: 'https://via.placeholder.com/150',
      },
      date: '2023-11-18T06:32:14.533Z',
      status: 'Paid',
    },
    {
      id: 2,
      paymentID: '202311172',
      customer: {
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        phone: '1234567890',
        address: '123 Main St, New York, NY 10030',
      },
      product: {
        id: 2,
        name: '3 Days trip to Bali and Lombok',
        price: 3000,
        description: 'Product 2 description',
        image: 'https://via.placeholder.com/150',
      },
      date: '2023-11-18T06:32:14.533Z',
      status: 'Failed',
    },
    {
      id: 3,
      paymentID: '202311173',
      customer: {
        id: 3,
        name: 'John Smith',
        email: 'johnsmith@gmail.com',
        phone: '1234567890',
        address: '123 Main St, New York, NY 10030',
      },
      product: {
        id: 3,
        name: '5 Days trip to Bandung',
        price: 4500,
        description: 'Product 3 description',
        image: 'https://via.placeholder.com/150',
      },
      date: '2023-11-18T06:32:14.533Z',
      status: 'Waiting'
    },
  ]

  printInvoice = (paymentID: Number) => {
    Swal.fire({
      title: 'Print Invoice',
      text: `Do you want to print invoice ${paymentID}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success',
          text: `Invoice ${paymentID} printed`,
          icon: 'success',
        })
      }
    })
  }

  addReview = (paymentID: Number) => {
    Swal.fire({
      title: 'Submit a Review',
      html: `
        <div class="mb-3">
          <label for="starRating" class="block mb-1">Rating:</label>
          <select id="starRating" class="w-full p-2 border rounded-md" required>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div>
          <label for="reviewText" class="block mb-1">Review:</label>
          <textarea id="reviewText" class="w-full p-2 border rounded-md" rows="5" required placeholder="Write your review here..."></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        const selectedRating = (document.getElementById('starRating') as HTMLSelectElement).value;
        const reviewText = (document.getElementById('reviewText') as HTMLTextAreaElement).value;
        if (!reviewText) {
          Swal.showValidationMessage('Please enter your review.');
          return false; // Prevent closing the modal
        } else if (selectedRating === '0') {
          Swal.showValidationMessage('Please select a rating.');
          return false; // Prevent closing the modal
        } else {
          Swal.fire({
            title: 'Success',
            text: 'Review submitted with rating ' + selectedRating + ' and review text: ' + reviewText,
            icon: 'success',
          })
          return true;
        }
      },
    });
  }

  payNow = (paymentID: Number) => {
    Swal.fire({
      title: 'Pay Now',
      text: `Navigate to payment page for invoice ${paymentID}?`,
    })
  }

  payments = this.paymentsDummy

  filterByStatus = (status: String) => {
    if (status === 'all') {
      this.payments = this.paymentsDummy
    } else {
      this.payments = this.paymentsDummy.filter((payment) => payment.status === status)
    }
  }



}
