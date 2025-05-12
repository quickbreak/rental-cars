import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCars } from '../contexts/CarContext';
import CarCard from '../components/car/CarCard';
import CarFiltersPanel from '../components/car/CarFiltersPanel';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { CarType } from '../types';

const CarsPage = () => {
  const { filteredCars, updateFilters, filters, isLoading } = useCars();
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Browse Cars - RentWheels';
    
    // Apply filters from URL params if they exist
    const typeParam = searchParams.get('type');
    if (typeParam) {
      updateFilters({ carTypes: [typeParam as CarType] });
    }
  }, []);

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Our Fleet</h1>
          <p className="text-gray-600">
            Find your perfect ride from our wide selection of vehicles.
          </p>
        </div>

        {/* Mobile filters button */}
        <div className="lg:hidden mb-6 flex items-center justify-between">
          <button
            onClick={toggleMobileFilters}
            className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center space-x-2"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
        
        {/* Mobile filters panel (slide-in) */}
        <div className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${
          mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileFilters}></div>
          <div className="absolute top-0 left-0 h-full w-80 bg-white overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium flex items-center">
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </h3>
              <button onClick={toggleMobileFilters} className="text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <CarFiltersPanel isMobile={true} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters - desktop */}
          <div className="hidden lg:block w-full lg:w-1/4">
            <CarFiltersPanel />
          </div>
          
          {/* Main content */}
          <div className="w-full lg:w-3/4">
            {/* Results count and sort - desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <div className="text-gray-600">
                {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            
            {/* Cars grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="text-gray-500 mb-2">
                  <Filter size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-1">No cars found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find more options
                </p>
                <button
                  onClick={() => updateFilters({
                    priceRange: [0, 1000],
                    carTypes: [],
                    seats: [],
                    transmission: null,
                    fuelType: null,
                    sortBy: 'price-low',
                  })}
                  className="text-blue-700 font-medium hover:text-blue-800"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;