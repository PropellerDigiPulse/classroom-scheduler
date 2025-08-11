import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Classroom } from '../context/ClassroomContext';
import { Monitor, Users } from 'lucide-react';

interface ClassroomCardProps {
  classroom: Classroom;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({ classroom }) => {
  const navigate = useNavigate();

  console.log("classroom", classroom)

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/classrooms/${classroom.id}`)}
    >
      <div className={`h-3 bg-blue-500`}></div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{classroom.roomName}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {classroom.building}, Floor {classroom.floor}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{classroom.capacity} seats</span>
          </div>
          
          <div className="flex space-x-3">
            {classroom.hasProjector && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Projector
              </span>
            )}
            {classroom.hasComputers && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Monitor className="w-3 h-3 mr-1" />
                Computers
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomCard;