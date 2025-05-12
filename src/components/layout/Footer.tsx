import { Link } from 'react-router-dom';
import { Car, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Car size={24} className="text-blue-500" />
              <span className="text-xl font-bold">RentWheels</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Premium car rental service with a wide range of vehicles to meet your needs.
              Drive in style, comfort, and confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-white transition duration-300">
                  Cars
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition duration-300">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Car Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/cars?type=suv" className="text-gray-400 hover:text-white transition duration-300">
                  SUVs
                </Link>
              </li>
              <li>
                <Link to="/cars?type=sedan" className="text-gray-400 hover:text-white transition duration-300">
                  Sedans
                </Link>
              </li>
              <li>
                <Link to="/cars?type=luxury" className="text-gray-400 hover:text-white transition duration-300">
                  Luxury
                </Link>
              </li>
              <li>
                <Link to="/cars?type=sport" className="text-gray-400 hover:text-white transition duration-300">
                  Sports Cars
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-3">
              <p>123 Rental Street</p>
              <p>New York, NY 10001</p>
              <p>Email: info@rentwheels.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} RentWheels. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;