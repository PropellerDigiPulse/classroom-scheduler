import React from 'react';
import type { Schedule } from '../context/ScheduleContext';
import { Clock, User } from 'lucide-react';

interface ScheduleItemProps {
  schedule: Schedule;
  onEdit?: () => void;
  onDelete?: () => void;
}

const colors = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
];


let currentIndex = 0;

function getNextColor() {
  const color = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length; // cycles from 0 to 6 and loops
  return color;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule, onEdit, onDelete }) => {
  return (
    <div 
      className="p-4 mb-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ borderLeft: `4px solid ${getNextColor()}` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-900">{schedule.subject}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <User className="w-4 h-4 mr-1" />
            <span>{schedule.instructorName}</span>
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>
              {schedule.startTime} - {schedule.endTime}
            </span>
          </div>
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex space-x-2">
            {onEdit && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleItem;