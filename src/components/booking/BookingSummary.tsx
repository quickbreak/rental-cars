import { useEffect, useState } from 'react';
import { Car, BookingExtra } from '../../types';

interface BookingSummaryProps {
  car: Car;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  returnLocation: string;
  extras: BookingExtra[];
  totalPrice: number;
  onConfirm: () => void;
  isLoading: boolean;
}

const BookingSummary = ({
  car,
  startDate,
  endDate,
  pickupLocation,
  returnLocation,
  extras,
  totalPrice,
  onConfirm,
  isLoading
}: BookingSummaryProps) => {
  const [days, setDays] = useState(0);
  
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setDays(Math.max(1, diff));
    }
  }, [startDate, endDate]);

  const getLocationNameById = (id: string) => {
    // This would normally come from an API or context
    const locations: Record<string, string> = {
      'loc-1': 'Downtown Office',
      'loc-2': 'Airport Terminal',
      'loc-3': 'Central Station',
      'loc-4': 'North Branch',
      'loc-5': 'South Port'
    };
    
    return locations[id] || 'Unknown location';
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isFormComplete = startDate && endDate && pickupLocation && returnLocation;

  return (
    <div className="rounded-lg bg-white shadow-md p-5">
      <h3 className="font-medium text-lg mb-4">Booking Summary</h3>
      
      <div className="flex items-start mb-4">
        <img 
          src={car.images[0]} 
          alt={`${car.make} ${car.model}`} 
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div>
          <h4 className="font-bold">{car.make} {car.model}</h4>
          <p className="text-sm text-gray-600">{car.year} • {car.type}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {/* Rental Period */}
        <div className="flex justify-between">
          <span className="text-gray-600">Rental Period:</span>
          <span>
            {startDate && endDate 
              ? `${formatDate(startDate)} to ${formatDate(endDate)} (${days} days)` 
              : 'Not selected'}
          </span>
        </div>
        
        {/* Pickup Location */}
        <div className="flex justify-between">
          <span className="text-gray-600">Pickup:</span>
          <span>{pickupLocation ? getLocationNameById(pickupLocation) : 'Not selected'}</span>
        </div>
        
        {/* Return Location */}
        <div className="flex justify-between">
          <span className="text-gray-600">Return:</span>
          <span>{returnLocation ? getLocationNameById(returnLocation) : 'Not selected'}</span>
        </div>
      </div>
      
      <hr className="my-4" />
      
      {/* Price Breakdown */}
      <h4 className="font-medium mb-3">Price Breakdown</h4>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Car Rental:</span>
          <span>${car.pricePerDay} × {days} days</span>
        </div>
        
        {extras.length > 0 && extras.map(extra => (
          <div key={extra.id} className="flex justify-between">
            <span className="text-gray-600">{extra.name}:</span>
            <span>${extra.price}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center border-t pt-4 font-bold">
        <span>Total:</span>
        <span className="text-xl text-blue-700">${totalPrice}</span>
      </div>
      
      <button
        onClick={onConfirm}
        disabled={!isFormComplete || isLoading}
        className={`w-full mt-6 py-3 rounded-md text-white font-medium transition ${
          isFormComplete && !isLoading
            ? 'bg-blue-700 hover:bg-blue-800'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Processing...' : 'Confirm Booking'}
      </button>
      
      {!isFormComplete && (
        <p className="text-sm text-red-600 mt-2">
          Please select dates and locations to complete your booking.
        </p>
      )}
    </div>
  );
};

export default BookingSummary;