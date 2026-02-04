import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/bookings';

  createBooking(booking: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  getBookingsByUser(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`);
  }

  cancelBooking(bookingId: string): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${bookingId}/cancel`, {});
  }

  validateBookingDates(checkIn: Date, checkOut: Date): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < now) {
      errors.push('Check-in date cannot be in the past');
    }

    if (checkOutDate <= checkInDate) {
      errors.push('Check-out date must be after check-in date');
    }

    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights > 30) {
      errors.push('Maximum stay is 30 days');
    }

    return { valid: errors.length === 0, errors };
  }
}
