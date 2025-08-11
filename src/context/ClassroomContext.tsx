import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react'
import axios from "axios"

export interface Classroom {
  id:           string;
  roomName:     string;
  userEmail?:   string;
  building:     string;
  floor:        number;
  capacity:     number;
  hasProjector: boolean;
  hasComputers: boolean;
}

interface ClassroomContextType {
  classrooms: Classroom[];
  addClassroom: (classroom: Omit<Classroom, 'id'>) => void;
  updateClassroom: (id: string, classroom: Partial<Classroom>) => void;
  deleteClassroom: (id: string) => void;
  fetchClassRooms: () => void;
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

// Sample initial data
// const initialClassrooms: Classroom[] = [
//   {
//     id: '1',
//     roomName: 'Room 101',
//     building: 'Main Building',
//     floor: 1,
//     capacity: 30,
//     hasProjector: true,
//     hasComputers: false,
//   },
//   {
//     id: '2',
//     roomName: 'Computer Lab',
//     building: 'Science Building',
//     floor: 2,
//     capacity: 25,
//     hasProjector: true,
//     hasComputers: true,
//   },
//   {
//     id: '3',
//     roomName: 'Lecture Hall A',
//     building: 'Arts Building',
//     floor: 1,
//     capacity: 100,
//     hasProjector: true,
//     hasComputers: false,
//   },
// ];

export const ClassroomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  

  const addClassroom = async(classroom: Omit<Classroom, 'id'>) => {

    await axios.post("https://classroom.exceleed.in/api/v1/classRoom/create", {
      ...classroom
    }, {
      headers: {
        token: localStorage.getItem('token') ,
        "Content-Type": "application/json"
      }
    })
  };

  const updateClassroom = (id: string, updatedClassroom: Partial<Classroom>) => {
    setClassrooms(
      classrooms.map((classroom) =>
        classroom.id === id ? { ...classroom, ...updatedClassroom } : classroom
      )
    );
  };

  async function fetchClassRooms(){
    const response = await axios.get("https://classroom.exceleed.in/api/v1/classRoom/classRoomList", {
      headers: {
        token: localStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    })

    setClassrooms(response.data.classRooms)
  }

 

  const deleteClassroom = (id: string) => {
    setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
  };

  return (
    <ClassroomContext.Provider
      value={{ classrooms, addClassroom, updateClassroom, deleteClassroom, fetchClassRooms }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};

export const useClassroom = () => {
  const context = useContext(ClassroomContext);
  if (context === undefined) {
    throw new Error('useClassroom must be used within a ClassroomProvider');
  }
  return context;
}