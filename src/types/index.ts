// User-related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  licenseNumber?: string;
  bookings?: Booking[];
}

// Car-related types
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  type: CarType;
  transmission: 'automatic' | 'manual' | 'variable' | 'dual-clutch';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  pricePerDay: number;
  description: string;
  features: string[];
  images: string[];
  availability?: DateRange[];
  rating?: number;
  reviews?: Review[];
  location: string;
  link?: string;
}

export type CarType = 
  | 'sedan' 
  | 'suv' 
  | 'hatchback' 
  | 'convertible' 
  | 'luxury' 
  | 'sport';

// Location-related types
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Booking-related types
export interface Booking {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  returnLocation: string;
  status: BookingStatus;
  totalPrice: number;
  extras?: BookingExtra[];
  createdAt: string;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'cancelled' 
  | 'completed';

export interface BookingExtra {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface DateRange {
  start: string;
  end: string;
}

// Review-related types
export interface Review {
  id: string;
  userId: string;
  userName: string;
  carId: string;
  rating: number;
  comment: string;
  date: string;
}

// Filter-related types
export interface CarFilters {
  priceRange: [number, number];
  carTypes: CarType[];
  seats: number[];
  transmission?: 'automatic' | 'manual' | null;
  fuelType?: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | null;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'newest';
}