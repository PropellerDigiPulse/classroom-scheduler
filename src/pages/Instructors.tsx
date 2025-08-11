import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash, Edit } from 'lucide-react';
import axios from "axios"

interface Instructor {
  id: number | undefined,
  name: string;
  email: string;
  department: string;
  subjects: string[];
  image: File | null
}

// const initialInstructors: Instructor[] = [
//   {
//     id: '1',
//     name: 'Dr. Sarah Smith',
//     email: 'sarah.smith@university.edu',
//     department: 'Computer Science',
//     subjects: ['Programming', 'Data Structures', 'Algorithms'],
//   },
//   {
//     id: '2',
//     name: 'Prof. Michael Johnson',
//     email: 'michael.johnson@university.edu',
//     department: 'Mathematics',
//     subjects: ['Calculus', 'Linear Algebra', 'Statistics'],
//   },
// ];

const Instructors: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [newInstructor, setNewInstructor] = useState<Instructor>({
    id: 0,
    name: '',
    email: '',
    department: '',
    subjects: [''],
    image: null
  });
  const [fetch, setFetch] = useState<Boolean>(false)
  const fetchInstructor = async()=>{
    const response = await axios.get("https://classroom.exceleed.in/api/v1/instructor/instructorList", {
      headers: {
        token: localStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    })

    console.log(response.data.instructors)
    setInstructors(response.data.instructors)
  }

  useEffect(()=>{
    fetchInstructor()
  }, [fetch])


  const handleAddInstructor = async(e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newInstructor.name);
    formData.append('email', newInstructor.email);
    formData.append('department', newInstructor.department);
    formData.append('subjects', JSON.stringify(newInstructor.subjects)); // if it's an array

    if (newInstructor.image) {
      formData.append('image', newInstructor.image); // File object
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    const response = await axios.post("https://classroom.exceleed.in/api/v1/instructor/create", formData , {
      headers: {
        token: localStorage.getItem('token') 
      }
    })

    if(response.status === 200){
      setFetch(!fetch)
    }
    // console.log("instructor", instructor)
    // setInstructors([...instructors, instructor]);

    setShowAddForm(false);
    setNewInstructor({ id: undefined, name: '', email: '', department: '', subjects: [''], image: null });
  };

  const handleUpdateInstructor = async(e: React.FormEvent) => {
    e.preventDefault();
    if (editingInstructor) {
      // setInstructors(instructors.map(instructor => 
      //   instructor.id === editingInstructor.id ? editingInstructor : instructor
      // ));
      const formData = new FormData();
      formData.append('name', editingInstructor.name);
      formData.append('email', editingInstructor.email);
      formData.append('department', editingInstructor.department);
      formData.append('subjects', JSON.stringify(editingInstructor.subjects)); // if it's an array

      if (editingInstructor.image) {
        formData.append('image', editingInstructor.image); // File object
      }

      console.log("id", editingInstructor.id)
      const response = await axios.put(`https://classroom.exceleed.in/api/v1/instructor/updateInstructor/${editingInstructor.id}`, formData , {
        headers: {
          token: localStorage.getItem('token') 
        }
      })

      if(response.status === 200){
        setFetch(!fetch)
      }
      setEditingInstructor(null);
    }
  };

  const handleDeleteInstructor = async(id: number) => {
    // if (window.confirm('Are you sure you want to delete this instructor?')) {
    //   // setInstructors(instructors.filter(instructor => instructor.id !== id));
    // }
    const response = await axios.delete(`https://classroom.exceleed.in/api/v1/instructor/deleteInstructor/${id}`, {
      headers: {
        token: localStorage.getItem('token') 
      }
    })

    console.log("response", response)

    if(response.status === 200){
      setFetch(!fetch)
    }
  };

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Instructors</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Instructor
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
            placeholder="Search instructors by name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {(showAddForm || editingInstructor) && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}
          </h2>
          <form onSubmit={editingInstructor ? handleUpdateInstructor : handleAddInstructor}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editingInstructor ? editingInstructor.name : newInstructor.name}
                  onChange={(e) => editingInstructor 
                    ? setEditingInstructor({ ...editingInstructor, name: e.target.value })
                    : setNewInstructor({ ...newInstructor, name: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editingInstructor ? editingInstructor.email : newInstructor.email}
                  onChange={(e) => editingInstructor
                    ? setEditingInstructor({ ...editingInstructor, email: e.target.value })
                    : setNewInstructor({ ...newInstructor, email: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={editingInstructor ? editingInstructor.department : newInstructor.department}
                  onChange={(e) => editingInstructor
                    ? setEditingInstructor({ ...editingInstructor, department: e.target.value })
                    : setNewInstructor({ ...newInstructor, department: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    console.log("file", file)

                    if (editingInstructor) {
                      setEditingInstructor({ ...editingInstructor, image: file });
                    } else {
                      setNewInstructor({ ...newInstructor, image: file });
                    }
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subjects
              </label>
              {(editingInstructor ? editingInstructor.subjects : newInstructor.subjects).map((subject, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      const newSubjects = editingInstructor 
                        ? [...editingInstructor.subjects]
                        : [...newInstructor.subjects];
                      newSubjects[index] = e.target.value;
                      editingInstructor
                        ? setEditingInstructor({ ...editingInstructor, subjects: newSubjects })
                        : setNewInstructor({ ...newInstructor, subjects: newSubjects });
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter subject"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSubjects = editingInstructor
                        ? editingInstructor.subjects.filter((_, i) => i !== index)
                        : newInstructor.subjects.filter((_, i) => i !== index);
                      editingInstructor
                        ? setEditingInstructor({ ...editingInstructor, subjects: newSubjects })
                        : setNewInstructor({ ...newInstructor, subjects: newSubjects });
                    }}
                    className="px-2 py-2 text-red-600 hover:text-red-800"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newSubjects = editingInstructor
                    ? [...editingInstructor.subjects, '']
                    : [...newInstructor.subjects, ''];
                  editingInstructor
                    ? setEditingInstructor({ ...editingInstructor, subjects: newSubjects })
                    : setNewInstructor({ ...newInstructor, subjects: newSubjects });
                }}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Subject
              </button>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingInstructor(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                {editingInstructor ? 'Update Instructor' : 'Add Instructor'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {filteredInstructors.map((instructor) => (
          <div key={instructor.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
             
              <div className='flex gap-5'>
                <div className={`w-24 h-24 rounded-full shadow-lg flex items-center justify-center`}>
                  <ImageRender image={instructor.image} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{instructor.name}</h3>
                  <p className="text-sm text-gray-600">{instructor.email}</p>
                  <p className="text-sm text-gray-600 mt-1">Department: {instructor.department}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {instructor.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingInstructor(instructor)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteInstructor(Number(instructor.id))}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInstructors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No instructors found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search term.' : 'Get started by adding a new instructor.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Instructor
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Instructors;

export const ImageRender = ({image}: any)=>{
  function uint8ArrayToBase64(buffer: Uint8Array): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

function objectToUint8Array(obj: any): Uint8Array {
  const values: any = Object.values(obj); // Get all values
  return new Uint8Array(values); // Construct Uint8Array
}
 const base64 = image
  ? uint8ArrayToBase64(objectToUint8Array(image))
  : '';

const imageSrc = base64
  ? `data:image/png;base64,${base64}`
  : 'fallback.png'; // optional fallback
  return(
    <img src={imageSrc} alt="Image" className='w-20' />
  )
}