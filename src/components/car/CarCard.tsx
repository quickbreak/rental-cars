import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../../types';
import { Fuel, Users, Calendar, Radio } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getFuelIcon = (fuelType: string) => {
    switch (fuelType) {
      case 'electric':
        return 'Electric';
      case 'hybrid':
        return 'Hybrid';
      default:
        return fuelType.charAt(0).toUpperCase() + fuelType.slice(1);
    }
  };

  const getTransmissionLabel = (transmission: string) => {
    return transmission.charAt(0).toUpperCase() + transmission.slice(1);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.images[0]} 
          alt={`${car.make} ${car.model}`} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {car.rating && (
          <div className="absolute top-3 right-3 bg-blue-700 text-white px-2 py-1 rounded-md text-sm font-medium">
            {car.rating} ★
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {car.make} {car.model}
          </h3>
          <p className="text-lg font-bold text-blue-700">${car.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{car.year} • {car.type.charAt(0).toUpperCase() + car.type.slice(1)}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-700 text-sm">
            <Users size={16} className="mr-2 text-blue-700" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <Fuel size={16} className="mr-2 text-blue-700" />
            <span>{getFuelIcon(car.fuelType)}</span>
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <Radio size={16} className="mr-2 text-blue-700" />
            <span>{getTransmissionLabel(car.transmission)}</span>
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <Calendar size={16} className="mr-2 text-blue-700" />
            <span>Free cancellation</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/cars/${car.id}`} 
            className="text-blue-700 font-medium hover:text-blue-800 transition"
          >
            View details
          </Link>
          <Link 
            to={`/booking/${car.id}`} 
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;