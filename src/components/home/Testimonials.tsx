import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Business Traveler',
    image: 'https://avatars.mds.yandex.net/i?id=5e3d47a41006137fdc52b131dc1876af_l-5228659-images-thumbs&n=13',
    quote: 'The service was impeccable! I needed a luxury car for an important client meeting and RentWheels delivered beyond my expectations. The car was pristine and the process was seamless.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Family Vacation',
    image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/931cbc00-5498-4420-b954-ea30f439c85d/1920x',
    quote: 'We rented an SUV for our family road trip, and it was perfect. Spacious, comfortable, and great on gas. The kids loved it, and the pickup/drop-off was super convenient.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Weekend Getaway',
    image: 'https://avatars.mds.yandex.net/i?id=10327a983bc5146c339d8de06637e480_l-10354927-images-thumbs&n=13',
    quote: 'I treated myself to a convertible for a weekend coastal drive. The car was in excellent condition, and the booking process was straightforward. Will definitely use RentWheels again!',
    rating: 4
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Tech Entrepreneur',
    image: 'https://avatars.mds.yandex.net/i?id=ae3d2f87a5d5b15754f039117807cc1df52d98d6-4112653-images-thumbs&n=13',
    quote: 'As someone who values efficiency and quality, I was impressed with how smooth my experience was. The electric vehicle I rented was cutting-edge and environmentally friendly.',
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with RentWheels.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Testimonial carousel */}
          <div className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8">
                    {/* Rating stars */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-lg italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white text-blue-700 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white text-blue-700 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? 'bg-white' : 'bg-blue-300 hover:bg-blue-200'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;