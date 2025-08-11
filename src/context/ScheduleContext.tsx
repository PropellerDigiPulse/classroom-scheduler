import React, { createContext, useState, useContext } from 'react';
import axios from "axios"
import type { ReactNode } from 'react'

export interface Schedule {
  id: string;
  classRoomName: string;
  subject: string;
  instructorName: string;
  startTime: string;
  endTime: string;
  // dayOfWeek: string;
  topic: string;
}

interface ScheduleContextType {
  schedules: Schedule[];
  addSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  updateSchedule: (id: string, schedule: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
  // getClassroomSchedules: (classRoomName: string) => void;
  hasScheduleConflict: (schedule: Omit<Schedule, 'id'>, excludeId?: string) => boolean;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// Sample color palette for different subjects
// const colors = [
//   '#3B82F6', // blue
//   '#10B981', // green
//   '#F59E0B', // amber
//   '#EF4444', // red
//   '#8B5CF6', // purple
//   '#EC4899', // pink
//   '#06B6D4', // cyan
// ];

// Sample initial data
// /

export const ScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // const getRandomColor = () => {
  //   return colors[Math.floor(Math.random() * colors.length)];
  // };

  const addSchedule = async(schedule: Omit<Schedule, 'id'>) => {

    await axios.post("https://classroom.exceleed.in/api/v1/class/create", {
      ...schedule
    }, {
      headers: {
        token: localStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    })
  };

  const updateSchedule = (id: string, updatedSchedule: Partial<Schedule>) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updatedSchedule } : schedule
      )
    );
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  // const getClassroomSchedules = async(classRoomName: string) => {
  //   const response = await axios.get(`https://classroom.exceleed.in/api/v1/class/classList/${classRoomName}`, {
  //     headers: {
  //       token: localStorage.getItem('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ3NjM5NTE0fQ.a2hAa854QHYwG-75gS1BrFd17BIFya6oMItKFU_jfmE" ,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   const newSchedule = { 
  //     ...response.data.scheduledClass, 
  //     color: getRandomColor()
  //   };
  //   setSchedules(newSchedule)
  //   // return schedules.filter((schedule) => schedule.classroomId === classroomId);
  // };

  const hasScheduleConflict = (newSchedule: Omit<Schedule, 'id'>, excludeId?: string) => {
    return schedules.some((schedule) => {
      // Skip checking against self when updating
      if (excludeId && schedule.id === excludeId) return false;

      // Only check schedules in the same classroom and on the same day
      // if (schedule.classroomId !== newSchedule.classroomId || schedule.dayOfWeek !== newSchedule.dayOfWeek) {
      //   return false;
      // }

      const existingStart = new Date(`2000-01-01T${schedule.startTime}`);
      const existingEnd = new Date(`2000-01-01T${schedule.endTime}`);
      const newStart = new Date(`2000-01-01T${newSchedule.startTime}`);
      const newEnd = new Date(`2000-01-01T${newSchedule.endTime}`);

      // Check for overlap
      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  };

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        
        hasScheduleConflict,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};