import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking';
import { PropertyService } from '../../services/property';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.scss',
})
export class BookingForm {
  private readonly bookingService = inject(BookingService);
  private readonly propertyService = inject(PropertyService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  @Input() propertyId = '';
  @Input() pricePerNight = 0;

  bookingForm: FormGroup = this.fb.group({
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    guests: [1, [Validators.required, Validators.min(1)]],
  });

  totalPrice = 0;
  validationErrors: string[] = [];

  calculateTotal(): void {
    const { checkIn, checkOut } = this.bookingForm.value;
    if (checkIn && checkOut) {
      try {
        this.totalPrice = this.propertyService.calculateTotalPrice(
          this.pricePerNight,
          new Date(checkIn),
          new Date(checkOut)
        );
      } catch {
        this.totalPrice = 0;
      }
    }
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      return;
    }

    const { checkIn, checkOut, guests } = this.bookingForm.value;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const validation = this.bookingService.validateBookingDates(checkInDate, checkOutDate);

    if (!validation.valid) {
      this.validationErrors = validation.errors;
      validation.errors.forEach((error) => this.notificationService.showError(error));
      return;
    }

    this.validationErrors = [];
    this.calculateTotal();

    this.bookingService
      .createBooking({
        propertyId: this.propertyId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        totalPrice: this.totalPrice,
        status: 'pending',
      })
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Booking created successfully!');
          this.router.navigate(['/bookings']);
        },
        error: (err) => {
          this.notificationService.showError('Failed to create booking');
          console.error('Error creating booking:', err);
        },
      });
  }
}
