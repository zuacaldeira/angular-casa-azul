import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review';
import { Review } from '../../models/property.model';

@Component({
  selector: 'app-review-list',
  imports: [CommonModule],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList implements OnInit {
  private readonly reviewService = inject(ReviewService);

  @Input() propertyId = '';

  reviews: Review[] = [];
  averageRating = 0;
  loading = false;

  ngOnInit(): void {
    if (this.propertyId) {
      this.loadReviews();
    }
  }

  loadReviews(): void {
    this.loading = true;
    this.reviewService.getReviewsByProperty(this.propertyId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.averageRating = this.reviewService.calculateAverageRating(reviews);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading reviews:', err);
      },
    });
  }
}
