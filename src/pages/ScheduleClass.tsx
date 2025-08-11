import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClassroom } from '../context/ClassroomContext';
import { useSchedule } from '../context/ScheduleContext';
import { ArrowLeft, Calendar } from 'lucide-react';
import { DateTime } from "luxon";
import axios from "axios"

export const convertToIST = (utcDateTime: string): string => {
  return DateTime.fromISO(utcDateTime) // Parse as UTC
    .toFormat("dd-MM-yyyy hh:mm:ss a"); // Indian format (DD-MM-YYYY HH:MM:SS AM/PM)
};

const ScheduleClass: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { classrooms, fetchClassRooms } = useClassroom();
  const { addSchedule } = useSchedule();
  const [instructors, setInstructors] = useState([])

  // Check if we were passed a classroom ID through location state
  // const preselectedClassroomId = location.state?.classroomId;

  const [formData, setFormData] = useState({
    classRoomName: "",
    subject: '',
    instructorName: '',
    topic: '',
    startTime: '',
    endTime: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [hasConflict, setHasConflict] = useState(false);

  async function getInstructors(){
    const response = await axios.get("https://classroom.exceleed.in/api/v1/instructor/instructorList", {
      headers: {
        token: localStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    })
    console.log("Instructors", response.data.instructors)
    setInstructors(response.data.instructors)
  }

  useEffect(() => {
    // Reset conflict state when schedule changes
    fetchClassRooms()
    getInstructors()
    console.log("classrooms", classrooms)
    // if (formData.classRoomName && formData.dayOfWeek && formData.startTime && formData.endTime) {
    //   const conflict = hasScheduleConflict({
    //     classRoomName: formData.classRoomName,
    //     subject: formData.subject,
    //     instructorName: formData.instructorName,
    //     dayOfWeek: formData.dayOfWeek,
    //     startTime: formData.startTime,
    //     endTime: formData.endTime,
    //     color: '',
    //   });
    //   setHasConflict(conflict);
    // } else {
      // setHasConflict(false);
    // }
    console.log(formData)
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // const validateForm = () => {
  //   const newErrors: { [key: string]: string } = {};
    
  //   if (!formData.classRoomName) newErrors.classroomId = 'Please select a classroom';
  //   if (!formData.subject) newErrors.subject = 'Subject is required';
  //   if (!formData.instructorName) newErrors.instructorName = 'instructorName name is required';
  //   if (!formData.dayOfWeek) newErrors.dayOfWeek = 'Day of week is required';
  //   if (!formData.startTime) newErrors.startTime = 'Start time is required';
  //   if (!formData.endTime) newErrors.endTime = 'End time is required';
    
  //   if (formData.startTime && formData.endTime) {
  //     const start = new Date(`2000-01-01T${formData.startTime}`);
  //     const end = new Date(`2000-01-01T${formData.endTime}`);
      
  //     if (end <= start) {
  //       newErrors.endTime = 'End time must be after start time';
  //     }
  //   }
    
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // if (!validateForm()) return;
    
    // if (hasConflict) {
    //   if (!window.confirm('There is a scheduling conflict with an existing class. Do you want to continue anyway?')) {
    //     return;
    //   }
    // }

    console.log("formData", formData)
    console.log("time", convertToIST(formData.startTime))

    addSchedule({
      classRoomName: formData.classRoomName,
      subject: formData.subject,
      instructorName: formData.instructorName,
      startTime: convertToIST(formData.startTime),
      endTime: convertToIST(formData.endTime),
      topic: formData.topic
    });

    console.log("formData.classRoomName", formData.classRoomName)
    
    navigate(`/classrooms/${formData.classRoomName}`);
  };

  // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Schedule a Class</h1>
          </div>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* {hasConflict && (
              <div className="mb-6 p-4 rounded-md bg-amber-50 border border-amber-200 flex items-start">
                <AlertCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Scheduling Conflict</h3>
                  <p className="mt-1 text-sm text-amber-700">
                    This time slot conflicts with an existing class in this classroom. 
                    You can still save but be aware of the overlap.
                  </p>
                </div>
              </div>
            )} */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="classroomId" className="block text-sm font-medium text-gray-700 mb-1">
                  Classroom
                </label>
                <select
                  id="classRoomName"
                  name="classRoomName"
                  value={formData.classRoomName}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.classroomId ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                  <option value="">Select a classroom</option>
                  {classrooms.map((classroom) => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.roomName} ({classroom.building})
                    </option>
                  ))}i
                </select>
                {errors.classroomId && (
                  <p className="mt-1 text-sm text-red-600">{errors.classroomId}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                {/* <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.dayOfWeek ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                  <option value="">Select a day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select> */}
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics, Computer Science"
                  className={`block w-full px-3 py-2 border ${
                    errors.topic ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.topic && (
                  <p className="mt-1 text-sm text-red-600">{errors.topic}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics, Computer Science"
                  className={`block w-full px-3 py-2 border ${
                    errors.subject ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor
                </label>

                <select
                  id="instructorName"
                  name="instructorName"
                  value={formData.instructorName}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.classroomId ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                  <option value="">Select a InstructorName</option>
                  {instructors.map((instructor: any) => (
                    <option key={instructor.id} value={instructor.name}>
                      {instructor.name} 
                    </option>
                  ))}
                </select>
                {errors.instructorName && (
                  <p className="mt-1 text-sm text-red-600">{errors.instructorName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.startTime ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.endTime ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Schedule Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleClass;