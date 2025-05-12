import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../contexts/CarContext';
import { useBooking } from '../contexts/BookingContext';
import DatePicker from '../components/booking/DatePicker';
import LocationSelector from '../components/booking/LocationSelector';
import BookingExtras from '../components/booking/BookingExtras';
import BookingSummary from '../components/booking/BookingSummary';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const BookingPage = () => {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const { getCarById } = useCars();
  const { 
    initializeBooking, 
    updateBookingDates, 
    updateBookingLocations,
    addBookingExtra,
    removeBookingExtra,
    calculateTotalPrice,
    confirmBooking,
    currentBooking,
    isLoading 
  } = useBooking();
  
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [car] = useState(getCarById(carId || ''));
  
  useEffect(() => {
    document.title = 'Book Your Car - RentWheels';
    
    if (!car) {
      navigate('/cars');
      return;
    }
    
    // Initialize the booking
    initializeBooking(carId || '', car.pricePerDay);
  }, [carId]);
  
  const handleDateChange = (startDate: string, endDate: string) => {
    updateBookingDates(startDate, endDate);
  };
  
  const handleLocationChange = (pickup: string, returnLoc: string) => {
    updateBookingLocations(pickup, returnLoc);
  };
  
  const handleBookingConfirm = async () => {
    const success = await confirmBooking();
    if (success) {
      setBookingSuccess(true);
      window.scrollTo(0, 0);
    }
  };
  
  if (bookingSuccess) {
    return (
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Your booking for the {car?.make} {car?.model} has been successfully confirmed. 
              You'll receive an email with all the details shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/profile')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-md transition"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate('/cars')}
                className="border border-blue-700 text-blue-700 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition"
              >
                Browse More Cars
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!car || !currentBooking) return null;
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(`/cars/${carId}`)}
            className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to car details
          </button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Book Your Car</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main booking form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Picker */}
              <DatePicker 
                startDate={currentBooking.startDate || ''}
                endDate={currentBooking.endDate || ''}
                onDateChange={handleDateChange}
                unavailableDates={car.availability}
              />
              
              {/* Location Selector */}
              <LocationSelector 
                selectedPickup={currentBooking.pickupLocation || ''}
                selectedReturn={currentBooking.returnLocation || ''}
                onLocationChange={handleLocationChange}
              />
            </div>
            
            {/* Booking Extras */}
            <BookingExtras 
              selectedExtras={currentBooking.extras || []}
              onAddExtra={addBookingExtra}
              onRemoveExtra={removeBookingExtra}
            />
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary 
              car={car}
              startDate={currentBooking.startDate || ''}
              endDate={currentBooking.endDate || ''}
              pickupLocation={currentBooking.pickupLocation || ''}
              returnLocation={currentBooking.returnLocation || ''}
              extras={currentBooking.extras || []}
              totalPrice={calculateTotalPrice()}
              onConfirm={handleBookingConfirm}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;