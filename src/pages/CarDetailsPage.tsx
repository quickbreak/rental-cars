import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCars } from '../contexts/CarContext';
import { useAuth } from '../contexts/AuthContext';
import CarGallery from '../components/car/CarGallery';
import { Calendar, Fuel, Users, Radio, Star, Award, ArrowLeft, ChevronRight } from 'lucide-react';

const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getCarById, isLoading } = useCars();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(getCarById(id || ''));

  useEffect(() => {
    if (!isLoading) {
      const foundCar = getCarById(id || '');
      setCar(foundCar);
      
      if (foundCar) {
        document.title = `${foundCar.make} ${foundCar.model} - RentWheels`;
      } else {
        navigate('/cars');
      }
    }
  }, [id, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Car not found</h2>
        <p className="mb-6">The car you're looking for doesn't exist or has been removed.</p>
        <Link to="/cars" className="text-blue-700 hover:text-blue-800 font-medium">
          Browse all cars
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            to="/cars" 
            className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to cars
          </Link>
        </div>

        {/* Car details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <h1 className="text-3xl font-bold mb-2 md:mb-0">
                {car.make} {car.model}
              </h1>
              <div className="flex items-center text-lg">
                <span className="font-bold text-blue-700 text-2xl">${car.pricePerDay}</span>
                <span className="text-gray-600">/day</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={18} className="mr-1 text-blue-700" />
                <span>{car.year}</span>
              </div>
              <div className="flex items-center">
                <Users size={18} className="mr-1 text-blue-700" />
                <span>{car.seats} Seats</span>
              </div>
              <div className="flex items-center">
                <Fuel size={18} className="mr-1 text-blue-700" />
                <span>{car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}</span>
              </div>
              <div className="flex items-center">
                <Radio size={18} className="mr-1 text-blue-700" />
                <span>{car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}</span>
              </div>
              {car.rating && (
                <div className="flex items-center">
                  <Star size={18} className="mr-1 text-yellow-500 fill-yellow-500" />
                  <span>{car.rating} ({car.reviews?.length || 0} reviews)</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Car gallery */}
          <CarGallery images={car.images} carName={`${car.make} ${car.model}`} />
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Description and features */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">About this car</h2>
                <p className="text-gray-700 mb-6">
                  {car.description}
                </p>
                
                <h3 className="text-lg font-bold mb-3">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <ChevronRight size={16} className="mr-2 text-blue-700" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {car.reviews && car.reviews.length > 0 && (
                  <>
                    <h3 className="text-lg font-bold mb-3">Customer Reviews</h3>
                    <div className="space-y-4">
                      {car.reviews.slice(0, 3).map(review => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center mb-2">
                            <div className="mr-3 flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16} 
                                  className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                                />
                              ))}
                            </div>
                            <span className="font-medium">{review.userName}</span>
                            <span className="text-gray-500 text-sm ml-2">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Right column - Booking card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 border">
                  <div className="text-center mb-4">
                    <Award size={32} className="mx-auto text-blue-700 mb-2" />
                    <h3 className="text-lg font-bold">Ready to book this car?</h3>
                    <p className="text-gray-600 text-sm">
                      Free cancellation up to 24 hours before pickup
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Car rental:</span>
                      <span className="font-medium">${car.pricePerDay}/day</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-medium">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Total from:</span>
                      <span className="font-bold text-blue-700">${car.pricePerDay}/day</span>
                    </div>
                  </div>
                  
                  <Link
                    to={isAuthenticated ? `/booking/${car.id}` : `/login?redirect=/booking/${car.id}`}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-md transition flex items-center justify-center"
                  >
                    Book Now
                  </Link>
                </div>
                
                <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Location</h4>
                  <p className="text-gray-700 mb-1">
                    Available at: {car.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    You can pick up and return this car at multiple locations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;