import React, { useState } from 'react';
import { Plus, Trash, Edit, Clock } from 'lucide-react';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  type: string;
}

const initialTimeSlots: TimeSlot[] = [
  {
    id: '1',
    startTime: '09:00',
    endTime: '10:30',
    dayOfWeek: 'Monday',
    type: 'Lecture',
  },
  {
    id: '2',
    startTime: '11:00',
    endTime: '12:30',
    dayOfWeek: 'Monday',
    type: 'Lab',
  },
];

const TimeSlots: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTimeSlot, setEditingTimeSlot] = useState<TimeSlot | null>(null);
  const [newTimeSlot, setNewTimeSlot] = useState({
    startTime: '',
    endTime: '',
    dayOfWeek: '',
    type: '',
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const slotTypes = ['Lecture', 'Lab', 'Tutorial', 'Workshop'];

  const handleAddTimeSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const timeSlot: TimeSlot = {
      id: Date.now().toString(),
      ...newTimeSlot,
    };
    setTimeSlots([...timeSlots, timeSlot]);
    setShowAddForm(false);
    setNewTimeSlot({ startTime: '', endTime: '', dayOfWeek: '', type: '' });
  };

  const handleUpdateTimeSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTimeSlot) {
      setTimeSlots(timeSlots.map(slot => 
        slot.id === editingTimeSlot.id ? editingTimeSlot : slot
      ));
      setEditingTimeSlot(null);
    }
  };

  const handleDeleteTimeSlot = (id: string) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    }
  };

  const validateTimeSlot = (startTime: string, endTime: string): boolean => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return end > start;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Time Slots</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Time Slot
        </button>
      </div>

      {(showAddForm || editingTimeSlot) && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editingTimeSlot ? 'Edit Time Slot' : 'Add New Time Slot'}
          </h2>
          <form onSubmit={editingTimeSlot ? handleUpdateTimeSlot : handleAddTimeSlot}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day of Week
                </label>
                <select
                  value={editingTimeSlot ? editingTimeSlot.dayOfWeek : newTimeSlot.dayOfWeek}
                  onChange={(e) => editingTimeSlot
                    ? setEditingTimeSlot({ ...editingTimeSlot, dayOfWeek: e.target.value })
                    : setNewTimeSlot({ ...newTimeSlot, dayOfWeek: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select a day</option>
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={editingTimeSlot ? editingTimeSlot.type : newTimeSlot.type}
                  onChange={(e) => editingTimeSlot
                    ? setEditingTimeSlot({ ...editingTimeSlot, type: e.target.value })
                    : setNewTimeSlot({ ...newTimeSlot, type: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select type</option>
                  {slotTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={editingTimeSlot ? editingTimeSlot.startTime : newTimeSlot.startTime}
                  onChange={(e) => editingTimeSlot
                    ? setEditingTimeSlot({ ...editingTimeSlot, startTime: e.target.value })
                    : setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={editingTimeSlot ? editingTimeSlot.endTime : newTimeSlot.endTime}
                  onChange={(e) => editingTimeSlot
                    ? setEditingTimeSlot({ ...editingTimeSlot, endTime: e.target.value })
                    : setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingTimeSlot(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                disabled={editingTimeSlot 
                  ? !validateTimeSlot(editingTimeSlot.startTime, editingTimeSlot.endTime)
                  : !validateTimeSlot(newTimeSlot.startTime, newTimeSlot.endTime)
                }
              >
                {editingTimeSlot ? 'Update Time Slot' : 'Add Time Slot'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {daysOfWeek.map(day => {
          const daySlots = timeSlots.filter(slot => slot.dayOfWeek === day);
          return (
            <div key={day} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{day}</h3>
              </div>
              <div className="p-4">
                {daySlots.length > 0 ? (
                  <div className="space-y-3">
                    {daySlots.map(slot => (
                      <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="flex items-center text-sm font-medium text-gray-900">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            {slot.startTime} - {slot.endTime}
                          </div>
                          <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {slot.type}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingTimeSlot(slot)}
                            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTimeSlot(slot.id)}
                            className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-sm text-gray-500">
                    No time slots scheduled
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;