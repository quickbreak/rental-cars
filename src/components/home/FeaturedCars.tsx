import { Link } from 'react-router-dom';
import { useCars } from '../../contexts/CarContext';
import CarCard from '../car/CarCard';
import { ArrowRight } from 'lucide-react';

const FeaturedCars = () => {
  const { featuredCars, isLoading } = useCars();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our top-rated cars selected for their exceptional performance, comfort, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.slice(0, 6).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/cars" 
            className="inline-flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-md transition"
          >
            View All Cars
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;