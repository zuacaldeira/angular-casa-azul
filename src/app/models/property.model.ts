export interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  available: boolean;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bookings: string[];
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  checkIn?: Date;
  checkOut?: Date;
  amenities?: string[];
}
