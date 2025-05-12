import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useCars } from '../contexts/CarContext';
import { Booking } from '../types';
import { User, Calendar, Car, LogOut, Edit, CheckCircle, ShieldCheck } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { getUserBookings, cancelBooking } = useBooking();
  const { getCarById } = useCars();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    licenseNumber: user?.licenseNumber || ''
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  useEffect(() => {
    document.title = 'My Profile - RentWheels';
    
    const fetchBookings = async () => {
      const userBookings = await getUserBookings();
      setBookings(userBookings);
    };
    
    fetchBookings();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
      setUpdateSuccess(true);
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }
  };
  
  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const success = await cancelBooking(bookingId);
      if (success) {
        // Refresh bookings list
        const updatedBookings = await getUserBookings();
        setBookings(updatedBookings);
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) return null;
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-blue-700 p-6 text-white text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white text-blue-700 mb-4">
                  <User size={32} />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-blue-100">{user.email}</p>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`flex items-center py-2 px-4 rounded-md transition ${
                      activeTab === 'bookings' 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Calendar size={20} className="mr-3" />
                    My Bookings
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center py-2 px-4 rounded-md transition ${
                      activeTab === 'profile' 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <User size={20} className="mr-3" />
                    Account Settings
                  </button>
                </div>
                
                <hr className="my-4" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 w-full py-2 px-4 rounded-md hover:bg-gray-100 transition"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2">
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">My Bookings</h2>
                
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Car size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">
                      When you book a car, it will appear here.
                    </p>
                    <button
                      onClick={() => navigate('/cars')}
                      className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition"
                    >
                      Browse Cars
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {bookings.map(booking => {
                      const car = getCarById(booking.carId);
                      if (!car) return null;
                      
                      return (
                        <div key={booking.id} className="border rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between bg-gray-50 p-4 border-b">
                            <div className="flex items-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4 mb-4 md:mb-0">
                                <img 
                                  src={car.images[0]} 
                                  alt={`${car.make} ${car.model}`}
                                  className="w-full h-32 object-cover rounded-md"
                                />
                              </div>
                              
                              <div className="md:w-3/4 md:pl-4">
                                <h3 className="text-lg font-bold mb-2">
                                  {car.make} {car.model}
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">Pickup:</span>
                                    <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                                  </div>
                                  
                                  <div>
                                    <span className="text-gray-600">Return:</span>
                                    <div>{new Date(booking.endDate).toLocaleDateString()}</div>
                                  </div>
                                  
                                  <div>
                                    <span className="text-gray-600">Total:</span>
                                    <div className="font-medium">${booking.totalPrice}</div>
                                  </div>
                                </div>
                                
                                {booking.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleCancelBooking(booking.id)}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                  >
                                    Cancel Booking
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Account Settings</h2>
                  
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center text-blue-700 hover:text-blue-800"
                    >
                      <Edit size={18} className="mr-1" />
                      Edit
                    </button>
                  )}
                </div>
                
                {updateSuccess && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4 flex items-center text-green-800">
                    <CheckCircle size={20} className="mr-2 flex-shrink-0" />
                    Profile updated successfully
                  </div>
                )}
                
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.name}</div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">{user.email}</div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          {user.phone || 'Not provided'}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Driver's License Number
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="licenseNumber"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-md">
                          {user.licenseNumber || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
                
                <div className="mt-8 border-t pt-6">
                  <div className="flex items-start mb-4">
                    <ShieldCheck size={24} className="text-green-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Your data is secure</h3>
                      <p className="text-gray-600 text-sm">
                        We value your privacy and keep your personal information secure.
                        Read our <a href="#" className="text-blue-700 hover:underline">Privacy Policy</a> to learn more.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;