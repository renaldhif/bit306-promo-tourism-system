import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/service/payment-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent {

  paymentId: number | null;
  payment: any;
  paymentsDummy: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
  this.paymentId = idParam ? parseInt(idParam, 10) : null;
  }

  ngOnInit(): void {
    this.paymentsDummy = this.paymentService.getAllPayments();
    if (this.paymentId !== null) {
      this.payment = this.paymentService.getPaymentById(this.paymentId);
    }
  }

  viewDetail = (paymentID: Number) => {
    this.router.navigate(['/customer/payment-history-detail', paymentID]);
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
    this.router.navigate(['/customer/checkout', paymentID]);
  }

  filterByStatus = (status: String) => {
    this.router.navigate(['/payment-history', { status: status }]);
  }

}
