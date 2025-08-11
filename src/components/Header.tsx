import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white shadow-sm">
      <div className="flex items-center">
        <button
          className="p-1 text-gray-500 rounded-md lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="ml-6 md:ml-0">
          <h1 className="text-2xl font-bold text-blue-600">ClassScheduler</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-64 py-2 pl-10 pr-4 text-sm bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent"
            placeholder="Search for classrooms..."
          />
        </div>

        <button className="p-1 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
          <Bell className="w-6 h-6" />
        </button>

        <div className="relative">
          {/* <button className="flex items-center text-sm font-medium text-gray-700 rounded-full hover:text-gray-900 focus:outline-none">
            <span className="sr-only">Open user menu</span>
            <div className="w-8 h-8 overflow-hidden rounded-full bg-blue-100">
              <span className="flex items-center justify-center w-full h-full text-blue-600 font-semibold">
                AS
              </span>
            </div>
          </button> */}
          <button
            onClick={() => {navigate('/login'); localStorage.removeItem("token") }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;