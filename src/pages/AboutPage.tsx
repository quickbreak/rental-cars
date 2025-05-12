import { useEffect } from 'react';
import { Car, Users, ShieldCheck, Award, Clock } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us - RentWheels';
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About RentWheels</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're on a mission to provide the best car rental experience with premium vehicles and exceptional service.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">
              Founded in 2015, RentWheels started with a simple idea: make car rentals easy, transparent, and enjoyable. Our founder, tired of complicated rental processes and hidden fees, decided to create a service that puts customers first.
            </p>
            <p className="text-gray-700 mb-4">
              What began with a small fleet of 10 vehicles has grown into a nationwide service with over 1,000 premium cars across 50 locations. Despite our growth, our core values remain the same – providing exceptional vehicles, transparent pricing, and customer service that exceeds expectations.
            </p>
            <p className="text-gray-700">
              Today, RentWheels is recognized as an industry leader, continuously innovating to make your journey more comfortable and convenient. We're not just renting cars; we're delivering experiences.
            </p>
          </div>
          <div>
            <img 
              src="https://avatars.mds.yandex.net/get-altay/11873493/2a00000193680666dfd7dee16347c595e622/XXXL" 
              alt="Team at RentWheels headquarters"
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16 mb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RentWheels</h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center transition-transform hover:-translate-y-1">
              <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Fleet</h3>
              <p className="text-gray-700">
                Our vehicles are meticulously maintained, regularly updated, and include the latest models.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center transition-transform hover:-translate-y-1">
              <div className="bg-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-gray-700">
                Your safety is our priority with rigorous maintenance schedules and comprehensive insurance coverage.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg text-center transition-transform hover:-translate-y-1">
              <div className="bg-purple-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Service</h3>
              <p className="text-gray-700">
                Our dedicated team is available 24/7 to ensure your rental experience is smooth and hassle-free.
              </p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg text-center transition-transform hover:-translate-y-1">
              <div className="bg-orange-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Convenience</h3>
              <p className="text-gray-700">
                With flexible pickup/drop-off options and a simple booking process, we save you time and stress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Transparency</h3>
            <p className="text-gray-700">
              No hidden fees, no surprises. We believe in clear communication and upfront pricing.
            </p>
          </div>
          
          <div className="border p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Excellence</h3>
            <p className="text-gray-700">
              We strive for excellence in everything we do, from our vehicle selection to our customer service.
            </p>
          </div>
          
          <div className="border p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Innovation</h3>
            <p className="text-gray-700">
              We continuously improve our services and embrace technology to enhance your experience.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-blue-700 text-white py-16 mb-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="text-5xl font-serif mb-6">"</div>
          <p className="text-xl italic mb-6">
            RentWheels has transformed how we think about car rentals. Their service is exceptional, the vehicles are immaculate, and the whole process is refreshingly simple.
          </p>
          <div className="w-16 h-16 mx-auto mb-3">
            <img 
              src="https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/931cbc00-5498-4420-b954-ea30f439c85d/1920x" 
              alt="Testimonial author"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="font-bold">Michael Rodriguez</p>
          <p className="text-blue-200 text-sm">Business Traveler</p>
        </div>
      </div>

      {/* Awards */}
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Awards</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Award size={48} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="font-bold mb-2">Best Customer Service</h3>
            <p className="text-gray-600 text-sm">National Rental Association, 2023</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Award size={48} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="font-bold mb-2">Innovation Excellence</h3>
            <p className="text-gray-600 text-sm">Technology in Travel Awards, 2022</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Award size={48} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="font-bold mb-2">Sustainability Champion</h3>
            <p className="text-gray-600 text-sm">Green Business Awards, 2021</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
        <p className="text-xl text-gray-700 mb-6">
          Join thousands of satisfied customers who choose RentWheels for their travel needs.
        </p>
        <a 
          href="/cars" 
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-md transition"
        >
          Browse Our Fleet
        </a>
      </div>
    </div>
  );
};

export default AboutPage;