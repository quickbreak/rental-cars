import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedCars from '../components/home/FeaturedCars';
import HowItWorks from '../components/home/HowItWorks';
import CarCategories from '../components/home/CarCategories';
import Testimonials from '../components/home/Testimonials';
import SpecialOffers from '../components/home/SpecialOffers';

const HomePage = () => {
  useEffect(() => {
    document.title = 'RentWheels - Premium Car Rental Service';
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedCars />
      <HowItWorks />
      <CarCategories />
      <Testimonials />
      <SpecialOffers />
    </div>
  );
};

export default HomePage;