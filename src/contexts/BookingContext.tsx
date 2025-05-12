import { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, BookingExtra } from '../types';
import { useAuth } from './AuthContext';

interface BookingContextType {
  userBookings: Booking[];
  currentBooking: Partial<Booking> | null;
  isLoading: boolean;
  error: string | null;
  initializeBooking: (carId: string, price: number) => void;
  updateBookingDates: (startDate: string, endDate: string) => void;
  updateBookingLocations: (pickup: string, returnLoc: string) => void;
  addBookingExtra: (extra: BookingExtra) => void;
  removeBookingExtra: (extraId: string) => void;
  calculateTotalPrice: () => number;
  confirmBooking: () => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  getUserBookings: () => Promise<Booking[]>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize a new booking
  const initializeBooking = (carId: string, pricePerDay: number) => {
    if (!user) {
      setError('You must be logged in to book a car');
      return;
    }

    setCurrentBooking({
      carId,
      userId: user.id,
      totalPrice: pricePerDay, // Initial price is just for one day
      extras: [],
    });
  };

  // Update booking dates
  const updateBookingDates = (startDate: string, endDate: string) => {
    if (!currentBooking) return;
    
    setCurrentBooking(prev => {
      if (!prev) return null;
      return { ...prev, startDate, endDate };
    });
  };

  // Update pickup and return locations
  const updateBookingLocations = (pickupLocation: string, returnLocation: string) => {
    if (!currentBooking) return;
    
    setCurrentBooking(prev => {
      if (!prev) return null;
      return { ...prev, pickupLocation, returnLocation };
    });
  };

  // Add an extra service to the booking
  const addBookingExtra = (extra: BookingExtra) => {
    if (!currentBooking) return;
    
    setCurrentBooking(prev => {
      if (!prev) return null;
      
      const updatedExtras = [...(prev.extras || [])];
      const existingIndex = updatedExtras.findIndex(e => e.id === extra.id);
      
      if (existingIndex >= 0) {
        updatedExtras[existingIndex] = { ...extra, selected: true };
      } else {
        updatedExtras.push({ ...extra, selected: true });
      }
      
      return { ...prev, extras: updatedExtras };
    });
  };

  // Remove an extra service from the booking
  const removeBookingExtra = (extraId: string) => {
    if (!currentBooking || !currentBooking.extras) return;
    
    setCurrentBooking(prev => {
      if (!prev || !prev.extras) return prev;
      
      const updatedExtras = prev.extras.filter(e => e.id !== extraId);
      return { ...prev, extras: updatedExtras };
    });
  };

  // Calculate the total price based on days and extras
  const calculateTotalPrice = (): number => {
    if (!currentBooking || !currentBooking.startDate || !currentBooking.endDate) {
      return 0;
    }

    const start = new Date(currentBooking.startDate);
    const end = new Date(currentBooking.endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    
    // Base price for the car
    let totalPrice = (currentBooking.totalPrice || 0) * days;
    
    // Add prices for extras
    if (currentBooking.extras && currentBooking.extras.length > 0) {
      currentBooking.extras.forEach(extra => {
        if (extra.selected) {
          totalPrice += extra.price;
        }
      });
    }
    
    return totalPrice;
  };

  // Confirm and submit the booking
  const confirmBooking = async (): Promise<boolean> => {
    if (!currentBooking || !user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        userId: user.id,
        carId: currentBooking.carId || '',
        startDate: currentBooking.startDate || '',
        endDate: currentBooking.endDate || '',
        pickupLocation: currentBooking.pickupLocation || '',
        returnLocation: currentBooking.returnLocation || '',
        status: 'confirmed',
        totalPrice: calculateTotalPrice(),
        extras: currentBooking.extras || [],
        createdAt: new Date().toISOString(),
      };
      
      // Save to local storage for demo purposes
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = [...existingBookings, newBooking];
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      setUserBookings(prev => [...prev, newBooking]);
      setCurrentBooking(null);
      return true;
    } catch (err) {
      setError('Failed to confirm booking. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel an existing booking
  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = existingBookings.map((booking: Booking) => 
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      );
      
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      setUserBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      );
      
      return true;
    } catch (err) {
      setError('Failed to cancel booking. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user's bookings
  const getUserBookings = async (): Promise<Booking[]> => {
    if (!user) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const userBookings = allBookings.filter((booking: Booking) => booking.userId === user.id);
      
      setUserBookings(userBookings);
      return userBookings;
    } catch (err) {
      setError('Failed to fetch bookings. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    userBookings,
    currentBooking,
    isLoading,
    error,
    initializeBooking,
    updateBookingDates,
    updateBookingLocations,
    addBookingExtra,
    removeBookingExtra,
    calculateTotalPrice,
    confirmBooking,
    cancelBooking,
    getUserBookings,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};