import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get redirect path from URL query params
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';
  
  useEffect(() => {
    document.title = 'Sign In - RentWheels';
    
    // Redirect if user is already authenticated
    if (isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate(redirectPath);
      } else {
        setError('Invalid email or password. Try demo@example.com and password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDemoLogin = async () => {
    setEmail('demo@example.com');
    setPassword('password');
    
    setTimeout(async () => {
      setIsLoading(true);
      const success = await login('demo@example.com', 'password');
      
      if (success) {
        navigate(redirectPath);
      } else {
        setError('Failed to log in with demo account.');
        setIsLoading(false);
      }
    }, 500);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                Sign in to access your account and bookings
              </p>
            </div>
            
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-sm text-blue-700 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-md transition flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : (
                  <LogIn size={20} className="mr-2" />
                )}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-300 absolute w-full"></div>
                <div className="bg-white px-4 relative text-sm text-gray-500">or</div>
              </div>
              
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-md transition"
              >
                Continue with Demo Account
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-700 hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;