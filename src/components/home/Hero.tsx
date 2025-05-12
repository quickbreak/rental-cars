import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://avatars.mds.yandex.net/get-altay/965237/2a00000164f6e05ce6c601eafcbc890a5c98/XXXL" 
          alt="Luxury cars" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 md:py-40">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Premium Cars, <br />
            <span className="text-yellow-400">Exceptional</span> Experience
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Discover our fleet of luxury, sports, and economy vehicles. 
            Rent with confidence for your next adventure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/cars"
              className="bg-white text-blue-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition flex items-center justify-center"
            >
              Browse Cars
              <ArrowRight size={20} className="ml-2" />
            </Link>
            
            <Link
              to="/about"
              className="bg-transparent hover:bg-blue-600 border border-white py-3 px-6 rounded-md transition flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom wave shape */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-[60px] text-white fill-current">
          <path fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div> */}
    </div>
  );
};

export default Hero;