import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useClassroom } from '../context/ClassroomContext';
// import { useSchedule } from '../context/ScheduleContext';
import ScheduleItem from '../components/ScheduleItem';
// import WeeklyCalendar from '../components/WeeklyCalendar';
import { Calendar, List,  Edit, ArrowLeft, Trash } from 'lucide-react';
import axios from "axios"

const ClassroomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [classes, setClasses] = useState([])
  const [classroom, setClassroom] = useState({
    id: "",
    roomName: "",
    building: "",
    userEmail: "",
    floor: 0,
    capacity: 0,
    hasProjector: false,
    hasComputers: false
  })

  const navigate = useNavigate();
  // const { updateClassroom, deleteClassroom } = useClassroom();
  // const { getClassroomSchedules, deleteSchedule } = useSchedule();

  // const classroom = getClassroom(classRoomName || '');
  // const schedules = getClassroomSchedules(classRoomName || '');

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');
  // const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [fetch, setFetch] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [editedClassroom, setEditedClassroom] = useState({
    id: "",
    roomName: "",
    building: "",
    userEmail: "",
    floor: 0,
    capacity: 0,
    hasProjector: false,
    hasComputers: false
  });

  console.log("editedClassroom", editedClassroom)

  const getClassroom = async() => {
    console.log("roomName", roomId)
    const response = await axios.get(`https://classroom.exceleed.in/api/v1/classRoom/${roomId}`, {
      headers: {
          token: localStorage.getItem('token') 
        }
    })
    const fetchedData = response.data.classRoom
    setClassroom(fetchedData)
    setEditedClassroom(fetchedData)
  };

  const getClasses = async()=>{
    const response = await axios.get(`https://classroom.exceleed.in/api/v1/class/classList/${roomId}`)
    console.log("asnknsakj", response.data.classes)
    const data = response.data.classes
    setClasses(data)
  }

  useEffect(() => {
    // console.log("classroom", classroom)
    // if (classroom) {
    //   setEditedClassroom(classroom);
    // }
    getClassroom()
    const timeout = setTimeout(()=>{
      getClasses()
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [fetch]);

  console.log("classes", classes)
  
  if (!classroom) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">Classroom not found</h2>
        <button
          onClick={() => navigate('/classrooms')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Classrooms
        </button>
      </div>
    );
  }

  const handleUpdateClassroom = async() => {
    await axios.put(`https://classroom.exceleed.in/api/v1/classRoom/updateClassroom/${roomId}`, editedClassroom,  {
      headers: {
        token: localStorage.getItem('token') 
      }
    })
    setIsEditing(false)
    setFetch(!fetch)
  };

  const handleDeleteClassroom = async() => {
    await axios.delete(`https://classroom.exceleed.in/api/v1/classRoom/deleteClassroom/${roomId}`, {
      headers: {
        token: localStorage.getItem('token') 
      }
    })
    navigate('/classrooms')
  };

  // const handleScheduleClick = (schedule: any) => {
  //   // In a real app, this would open a modal or navigate to schedule detail
  //   console.log('Schedule clicked:', schedule);
  // };

  // const filteredSchedules = selectedDay
  //   ? schedules.filter((schedule) => schedule.dayOfWeek === selectedDay)
  //   : schedules;


  return (
    <div>
      <button
        onClick={() => navigate('/classrooms')}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Classrooms
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Classroom' : classroom.roomName}
          </h1>
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDeleteClassroom}
                  className="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateClassroom}
                  className="px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-6">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={editedClassroom?.roomName || ''}
                  onChange={(e) => setEditedClassroom({ ...editedClassroom!, roomName: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-1">
                  Building
                </label>
                <input
                  type="text"
                  id="building"
                  value={editedClassroom?.building || ''}
                  onChange={(e) => setEditedClassroom({ ...editedClassroom!, building: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
                  Floor
                </label>
                <input
                  type="number"
                  id="floor"
                  value={editedClassroom?.floor || 0}
                  onChange={(e) => setEditedClassroom({ ...editedClassroom!, floor: parseInt(e.target.value) })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={editedClassroom?.capacity || 0}
                  onChange={(e) => setEditedClassroom({ ...editedClassroom!, capacity: parseInt(e.target.value) })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      id="hasProjector"
                      type="checkbox"
                      checked={editedClassroom?.hasProjector || false}
                      onChange={(e) => setEditedClassroom({ ...editedClassroom!, hasProjector: e.target.checked })}
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
                      checked={editedClassroom?.hasComputers || false}
                      onChange={(e) => setEditedClassroom({ ...editedClassroom!, hasComputers: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasComputers" className="ml-2 block text-sm text-gray-700">
                      Has Computers
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Building</h3>
                <p className="mt-1 text-sm text-gray-900">{classroom.building}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Floor</h3>
                <p className="mt-1 text-sm text-gray-900">{classroom.floor}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Capacity</h3>
                <p className="mt-1 text-sm text-gray-900">{classroom.capacity} students</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Features</h3>
                <div className="mt-1 flex space-x-2">
                  {classroom.hasProjector && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Projector
                    </span>
                  )}
                  {classroom.hasComputers && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Computers
                    </span>
                  )}
                  {!classroom.hasProjector && !classroom.hasComputers && (
                    <span className="text-sm text-gray-500">No special features</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Class Schedule</h2>
            <div className="flex space-x-2">
              
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
            {classes.length > 0 ? (
              <div className="space-y-4">
                {classes.map((schedule: any) => (
                  <ScheduleItem
                    key={schedule.id}
                    schedule={schedule}
                    // onDelete={() => {
                    //   if (window.confirm('Are you sure you want to delete this schedule?')) {
                    //     deleteSchedule(schedule.id);
                    //   }
                    // }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div>
                  <Calendar className="w-12 h-12 mx-auto text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No classes scheduled</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no classes scheduled for Today
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/schedule')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Schedule Class
                  </button>
                </div>
                </div> 
              </div>
            )}
          </div>
        
      </div>
    </div>
    
  );
};

export default ClassroomDetail;