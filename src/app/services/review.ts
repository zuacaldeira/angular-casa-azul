import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/reviews';

  getReviewsByProperty(propertyId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/property/${propertyId}`);
  }

  addReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  calculateAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  }
}
