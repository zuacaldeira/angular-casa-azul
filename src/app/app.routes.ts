import { Routes } from '@angular/router';
import { PropertyListing } from './components/property-listing/property-listing';
import { PropertyDetail } from './components/property-detail/property-detail';
import { UserProfile } from './components/user-profile/user-profile';
import { BookingForm } from './components/booking-form/booking-form';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: PropertyListing },
  { path: 'property/:id', component: PropertyDetail },
  { path: 'profile', component: UserProfile, canActivate: [authGuard] },
  { path: 'bookings', component: BookingForm, canActivate: [authGuard] },
];
