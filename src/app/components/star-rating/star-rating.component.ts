import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];

  rate(rating: number) {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }
}
