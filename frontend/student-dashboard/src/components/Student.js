import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

function Student() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({});

  const fetchStudents = async () => {
    const studentsCollection = collection(db, 'students');
    const snapshot = await getDocs(studentsCollection);
    setStudents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleAddStudent = async () => {
    const studentsCollection = collection(db, 'students');
    await addDoc(studentsCollection, newStudent);
    setShowModal(false);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <button onClick={() => setShowModal(true)}>Add Student</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button onClick={() => deleteDoc(doc(db, 'students', student.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <h2>Add Student</h2>
          {/* Add inputs for 12 fields */}
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <button onClick={handleAddStudent}>Submit</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Student;