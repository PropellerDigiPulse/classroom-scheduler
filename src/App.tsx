import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClassroomProvider } from './context/ClassroomContext';
import { ScheduleProvider } from './context/ScheduleContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ClassroomList from './pages/ClassroomList';
import ClassroomDetail from './pages/ClassroomDetail';
import ScheduleClass from './pages/ScheduleClass';
import Instructors from './pages/Instructors';
import TimeSlots from './pages/TimeSlots';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';

export default function App() {
  return (
    <ClassroomProvider>
      <ScheduleProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="classrooms" element={<ClassroomList />} />
              <Route path="classrooms/:roomId" element={<ClassroomDetail />} />
              <Route path="schedule" element={<ScheduleClass />} />
              <Route path="instructors" element={<Instructors />} />
              <Route path="time-slots" element={<TimeSlots />} />              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ScheduleProvider>
    </ClassroomProvider>
  );
}