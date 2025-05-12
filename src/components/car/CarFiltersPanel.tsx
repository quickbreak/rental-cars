import { useState, useEffect } from 'react';
import { useCars } from '../../contexts/CarContext';
import { CarType } from '../../types';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const carTypeOptions: { value: CarType; label: string }[] = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'convertible', label: 'Convertible' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'sport', label: 'Sport' },
];

const seatOptions = [2, 4, 5, 7, 8];

const fuelTypeOptions = [
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
];

const transmissionOptions = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
  { value: 'variable', label: 'Variable' },
  { value: 'dual-clutch', label: 'Dual-Clutch'},
];

const sortOptions = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'newest', label: 'Newest First' },
];

interface CarFiltersPanelProps {
  isMobile?: boolean;
}

const CarFiltersPanel = ({ isMobile = false }: CarFiltersPanelProps) => {
  const { filters, updateFilters, resetFilters, cars } = useCars();
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    carType: true,
    seats: true,
    transmission: false,
    fuelType: false,
  });
  
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);
  const [minPriceInCars, setMinPriceInCars] = useState(0);
  const [maxPriceInCars, setMaxPriceInCars] = useState(1000);

  useEffect(() => {
    if (cars.length > 0) {
      const prices = cars.map(car => car.pricePerDay);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPriceInCars(min);
      setMaxPriceInCars(max);
      
      // Only update when the cars are loaded for the first time
      if (filters.priceRange[0] === 0 && filters.priceRange[1] === 1000) {
        setPriceRange([min, max]);
        updateFilters({ priceRange: [min, max] });
      }
    }
  }, [cars]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange: [number, number] = type === 'min' 
      ? [value, priceRange[1]] 
      : [priceRange[0], value];
    
    setPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    updateFilters({ priceRange });
  };

  const handleCarTypeToggle = (type: CarType) => {
    const currentTypes = [...filters.carTypes];
    
    if (currentTypes.includes(type)) {
      updateFilters({ 
        carTypes: currentTypes.filter(t => t !== type) 
      });
    } else {
      updateFilters({ 
        carTypes: [...currentTypes, type] 
      });
    }
  };

  const handleSeatToggle = (seats: number) => {
    const currentSeats = [...filters.seats];
    
    if (currentSeats.includes(seats)) {
      updateFilters({ 
        seats: currentSeats.filter(s => s !== seats) 
      });
    } else {
      updateFilters({ 
        seats: [...currentSeats, seats] 
      });
    }
  };

  const handleTransmissionChange = (transmission: 'automatic' | 'manual' | null) => {
    updateFilters({ transmission });
  };

  const handleFuelTypeChange = (fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | null) => {
    updateFilters({ fuelType });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ 
      sortBy: event.target.value as 'price-low' | 'price-high' | 'rating' | 'newest' 
    });
  };

  const handleReset = () => {
    resetFilters();
    setPriceRange([minPriceInCars, maxPriceInCars]);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-5 ${isMobile ? 'mb-6' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Filter size={20} className="mr-2 text-blue-700" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>
        <button 
          onClick={handleReset}
          className="text-sm text-blue-700 hover:text-blue-800 font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Sort dropdown - only show on mobile */}
      {isMobile && (
        <div className="mb-6">
          <label htmlFor="sort-mobile" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort-mobile"
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3" 
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-medium text-gray-800">Price Range</h3>
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">${priceRange[0]}</span>
              <span className="text-gray-600 text-sm">${priceRange[1]}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="min-price" className="block text-xs text-gray-600 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  id="min-price"
                  min={minPriceInCars}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label htmlFor="max-price" className="block text-xs text-gray-600 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  id="max-price"
                  min={priceRange[0]}
                  max={maxPriceInCars}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
            
            <button
              onClick={applyPriceFilter}
              className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition text-sm"
            >
              Apply Price
            </button>
          </div>
        )}
      </div>

      {/* Car Type */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3" 
          onClick={() => toggleSection('carType')}
        >
          <h3 className="font-medium text-gray-800">Car Type</h3>
          {expandedSections.carType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedSections.carType && (
          <div className="space-y-2">
            {carTypeOptions.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`car-type-${option.value}`}
                  checked={filters.carTypes.includes(option.value)}
                  onChange={() => handleCarTypeToggle(option.value)}
                  className="w-4 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-500"
                />
                <label 
                  htmlFor={`car-type-${option.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seats */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3" 
          onClick={() => toggleSection('seats')}
        >
          <h3 className="font-medium text-gray-800">Seats</h3>
          {expandedSections.seats ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedSections.seats && (
          <div className="flex flex-wrap gap-2">
            {seatOptions.map(seats => (
              <button
                key={seats}
                onClick={() => handleSeatToggle(seats)}
                className={`py-1 px-3 rounded-full text-sm border ${
                  filters.seats.includes(seats)
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                {seats} seats
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Transmission */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3" 
          onClick={() => toggleSection('transmission')}
        >
          <h3 className="font-medium text-gray-800">Transmission</h3>
          {expandedSections.transmission ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedSections.transmission && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="transmission-all"
                name="transmission"
                checked={filters.transmission === null}
                onChange={() => handleTransmissionChange(null)}
                className="w-4 h-4 text-blue-700 border-gray-300 focus:ring-blue-500"
              />
              <label 
                htmlFor="transmission-all"
                className="ml-2 text-sm text-gray-700"
              >
                All
              </label>
            </div>
            
            {transmissionOptions.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`transmission-${option.value}`}
                  name="transmission"
                  checked={filters.transmission === option.value}
                  onChange={() => handleTransmissionChange(option.value as 'automatic' | 'manual')}
                  className="w-4 h-4 text-blue-700 border-gray-300 focus:ring-blue-500"
                />
                <label 
                  htmlFor={`transmission-${option.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fuel Type */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3" 
          onClick={() => toggleSection('fuelType')}
        >
          <h3 className="font-medium text-gray-800">Fuel Type</h3>
          {expandedSections.fuelType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedSections.fuelType && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="fuel-type-all"
                name="fuelType"
                checked={filters.fuelType === null}
                onChange={() => handleFuelTypeChange(null)}
                className="w-4 h-4 text-blue-700 border-gray-300 focus:ring-blue-500"
              />
              <label 
                htmlFor="fuel-type-all"
                className="ml-2 text-sm text-gray-700"
              >
                All
              </label>
            </div>
            
            {fuelTypeOptions.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`fuel-type-${option.value}`}
                  name="fuelType"
                  checked={filters.fuelType === option.value}
                  onChange={() => handleFuelTypeChange(option.value as 'gasoline' | 'diesel' | 'electric' | 'hybrid')}
                  className="w-4 h-4 text-blue-700 border-gray-300 focus:ring-blue-500"
                />
                <label 
                  htmlFor={`fuel-type-${option.value}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarFiltersPanel;