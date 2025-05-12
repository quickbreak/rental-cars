import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Car, MenuIcon, User, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';
  const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHome
      ? 'bg-white shadow-md py-3'
      : 'bg-transparent py-5'
  }`;

  const linkClass = `transition duration-200 ${
    isScrolled || !isHome ? 'text-gray-800 hover:text-blue-700' : 'text-white hover:text-gray-200'
  }`;

  const activeClass = `font-medium ${
    isScrolled || !isHome ? 'text-blue-700' : 'text-white'
  }`;

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <Car className={isScrolled || !isHome ? 'text-blue-700' : 'text-white'} size={28} />
            <span className={isScrolled || !isHome ? 'text-blue-700' : 'text-white'}>
              RentWheels
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${linkClass} ${location.pathname === '/' ? activeClass : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className={`${linkClass} ${location.pathname.includes('/cars') ? activeClass : ''}`}
            >
              Cars
            </Link>
            <Link 
              to="/about" 
              className={`${linkClass} ${location.pathname === '/about' ? activeClass : ''}`}
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className={`flex items-center space-x-1 ${linkClass}`}>
                  <span>{user?.name}</span>
                  <User size={18} />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-full ${
                  isScrolled || !isHome
                    ? 'bg-blue-700 text-white hover:bg-blue-800'
                    : 'bg-white text-blue-700 hover:bg-gray-100'
                }`}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={isScrolled || !isHome ? 'text-gray-800' : 'text-white'} size={24} />
            ) : (
              <MenuIcon className={isScrolled || !isHome ? 'text-gray-800' : 'text-white'} size={24} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-2 bg-white rounded-lg shadow-lg">
            <Link 
              to="/" 
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Cars
            </Link>
            <Link 
              to="/about" 
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  My Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block py-2 px-4 text-blue-700 hover:bg-blue-50 rounded-md font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;