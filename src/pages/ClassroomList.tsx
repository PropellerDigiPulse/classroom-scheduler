import React, {  useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useClassroom } from '../context/ClassroomContext';
import ClassroomCard from '../components/ClassroomCard';
import { Plus, Search } from 'lucide-react';

const ClassroomList: React.FC = () => {
  // const navigate = useNavigate();
  const { classrooms } = useClassroom();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClassroom, setNewClassroom] = useState({
    roomName: '',
    building: '',
    floor: 1,
    capacity: 30,
    hasProjector: false,
    hasComputers: false,
  });
  const [fetch, setFetch] = useState<boolean>(false)

  const { fetchClassRooms, addClassroom } = useClassroom();

  useEffect(()=>{
    fetchClassRooms()
  }, [fetch])

  // const filteredClassrooms = classrooms.filter(
  //   (classroom) =>
  //     classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     classroom.building.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleAddClassroom = async() => {
    addClassroom(newClassroom);
    setShowAddForm(false);
    setNewClassroom({
      roomName: '',
      building: '',
      floor: 1,
      capacity: 30,
      hasProjector: false,
      hasComputers: false,
    });
    setFetch(!fetch)
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Classrooms</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Classroom
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full py-3 pl-10 pr-4 text-sm bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent"
            placeholder="Search for classrooms by name or building..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Classroom</h2>
          <form onSubmit={handleAddClassroom}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newClassroom.roomName}
                  onChange={(e) => setNewClassroom({ ...newClassroom, roomName: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-1">
                  Building
                </label>
                <input
                  type="text"
                  id="building"
                  value={newClassroom.building}
                  onChange={(e) => setNewClassroom({ ...newClassroom, building: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
                  Floor
                </label>
                <input
                  type="number"
                  id="floor"
                  value={newClassroom.floor}
                  onChange={(e) => setNewClassroom({ ...newClassroom, floor: parseInt(e.target.value) })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="0"
                  required
                />
              </div>
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={newClassroom.capacity}
                  onChange={(e) => setNewClassroom({ ...newClassroom, capacity: parseInt(e.target.value) })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="1"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center">
                <input
                  id="hasProjector"
                  type="checkbox"
                  checked={newClassroom.hasProjector}
                  onChange={(e) => setNewClassroom({ ...newClassroom, hasProjector: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasProjector" className="ml-2 block text-sm text-gray-700">
                  Has Projector
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="hasComputers"
                  type="checkbox"
                  checked={newClassroom.hasComputers}
                  onChange={(e) => setNewClassroom({ ...newClassroom, hasComputers: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasComputers" className="ml-2 block text-sm text-gray-700">
                  Has Computers
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Classroom
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map((classroom) => (
          <ClassroomCard key={classroom.id} classroom={classroom} />
        ))}
      </div>
      
      {classrooms.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No classrooms found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search term.' : 'Get started by adding a new classroom.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Classroom
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassroomList;