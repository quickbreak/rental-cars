import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car, CarFilters } from '../types';
import { mockCars } from '../data/mockData';

interface CarContextType {
  cars: Car[];
  featuredCars: Car[];
  isLoading: boolean;
  error: string | null;
  filters: CarFilters;
  filteredCars: Car[];
  getCarById: (id: string) => Car | undefined;
  updateFilters: (newFilters: Partial<CarFilters>) => void;
  resetFilters: () => void;
}

// Default filters
const defaultFilters: CarFilters = {
  priceRange: [0, 1000],
  carTypes: [],
  seats: [],
  transmission: null,
  fuelType: null,
  sortBy: 'price-low',
};

const CarContext = createContext<CarContextType | undefined>(undefined);

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};

interface CarProviderProps {
  children: ReactNode;
}

export const CarProvider = ({ children }: CarProviderProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CarFilters>(defaultFilters);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  // Fetch cars on mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // In a real app, this would be an API call
        // Using mock data for demonstration
        setCars(mockCars);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch cars. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply filters when cars or filters change
  useEffect(() => {
    if (!cars.length) return;

    let result = [...cars];

    // Filter by price range
    result = result.filter(
      car => car.pricePerDay >= filters.priceRange[0] && car.pricePerDay <= filters.priceRange[1]
    );

    // Filter by car type
    if (filters.carTypes.length > 0) {
      result = result.filter(car => filters.carTypes.includes(car.type));
    }

    // Filter by seats
    if (filters.seats.length > 0) {
      result = result.filter(car => filters.seats.includes(car.seats));
    }

    // Filter by transmission
    if (filters.transmission) {
      result = result.filter(car => car.transmission === filters.transmission);
    }

    // Filter by fuel type
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }

    // Sort results
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
    }

    setFilteredCars(result);
  }, [cars, filters]);

  // Get featured cars (top rated and newest)
  const featuredCars = cars
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  const getCarById = (id: string) => {
    return cars.find(car => car.id === id);
  };

  const updateFilters = (newFilters: Partial<CarFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const value = {
    cars,
    featuredCars,
    isLoading,
    error,
    filters,
    filteredCars,
    getCarById,
    updateFilters,
    resetFilters,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};