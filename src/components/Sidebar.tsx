import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BuildingIcon, 
  Users, 
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 transition-opacity lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-blue-600">ClassScheduler</span>
          </div>
          <button 
            className="p-1 text-gray-500 rounded-md lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-3 py-4">
          <div className="space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                }`
              }
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </NavLink>
            <NavLink
              to="/classrooms"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                }`
              }
            >
              <BuildingIcon className="w-5 h-5 mr-3" />
              Classrooms
            </NavLink>
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                }`
              }
            >
              <Calendar className="w-5 h-5 mr-3" />
              Schedule Class
            </NavLink>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-200">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Management
            </h3>
            <div className="mt-1 space-y-1">
              <NavLink
                to="/instructors"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'text-blue-700 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                  }`
                }
              >
                <Users className="w-5 h-5 mr-3" />
                Instructors
              </NavLink>
              {/* <NavLink
                to="/time-slots"
                className={({ isActive })  =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'text-blue-700 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                  }`
                }
              >
                <Clock className="w-5 h-5 mr-3" />
                Time Slots
              </NavLink> */}
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-blue-700 hover:bg-blue-50"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;