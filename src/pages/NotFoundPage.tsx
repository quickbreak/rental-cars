import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-yellow-100 p-5 rounded-full">
            <AlertTriangle size={64} className="text-yellow-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-md transition"
        >
          <Home size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;