import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClassroom } from '../context/ClassroomContext';
// import { useSchedule } from '../context/ScheduleContext';
import ClassroomCard from '../components/ClassroomCard';
// import ScheduleItem from '../components/ScheduleItem';
import { Plus, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { classrooms, fetchClassRooms } = useClassroom();
  // const { schedules } = useSchedule();
  // const [activeTab, setActiveTab] = useState<'upcoming' | 'today'>('today');

  // const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
const token = localStorage.getItem("token")
  useEffect(()=>{
    if(!token){
      navigate("/login")
    }
    fetchClassRooms()
  }, [])

  
  // const todaySchedules = schedules.filter(schedule => schedule.dayOfWeek === today);
  // const upcomingSchedules = schedules.filter(schedule => schedule.dayOfWeek !== today);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/classrooms')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Classroom
          </button>
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Classrooms</h2>
              <button
                onClick={() => navigate('/classrooms')}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View all
              </button>
            </div>
            <div className="p-6 space-y-4">
              {classrooms.slice(0, 3).map((classroom) => (
                <ClassroomCard key={classroom.id} classroom={classroom} />
              ))}
              {classrooms.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No classrooms available.</p>
                  <button
                    onClick={() => navigate('/classrooms')}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Classroom
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div >
          <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Class Schedule</h2>
            </div>
            <div className="p-6">
              <div className="flex space-x-4 mb-4">
                <button
            onClick={() => navigate('/schedule')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Class
          </button>
                {/* <button
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'upcoming'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </button> */}
              </div>
              
              {/* <div className="space-y-3">
                {activeTab === 'today' ? (
                  todaySchedules.length > 0 ? (
                    todaySchedules.map((schedule) => (
                      <ScheduleItem key={schedule.id} schedule={schedule} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <CalendarIcon className="w-12 h-12 mx-auto text-gray-300" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No classes today</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        There are no classes scheduled for today.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => navigate('/schedule')}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Schedule Class
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  upcomingSchedules.length > 0 ? (
                    upcomingSchedules.map((schedule) => (
                      <ScheduleItem key={schedule.id} schedule={schedule} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <CalendarIcon className="w-12 h-12 mx-auto text-gray-300" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming classes</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        There are no classes scheduled for the upcoming days.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => navigate('/schedule')}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Schedule Class
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div> */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;