import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { BookingService } from '../../services/booking';
import { User, Booking } from '../../models/property.model';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);

  user$: Observable<User | null> = of(null);
  bookings$: Observable<Booking[]> = of([]);

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser();
    this.bookings$ = this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (user) {
          return this.bookingService.getBookingsByUser(user.id);
        }
        return of([]);
      })
    );
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
