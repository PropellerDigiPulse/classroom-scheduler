import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-xl font-medium text-gray-600">Page Not Found</p>
      <p className="mt-2 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Home className="w-4 h-4 mr-2" />
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;