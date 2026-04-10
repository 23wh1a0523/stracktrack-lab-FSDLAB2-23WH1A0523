import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState(""); // keep search
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-student-id": "23WH1A0523"
      }
    })
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE",
      headers: { "x-student-id": "23WH1A0523" }
    })
      .then(() => setStudents(students.filter(student => student.id !== id)))
      .catch(err => console.log(err));
  };

  // Filter students by search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Student List</h1>
      <button onClick={() => navigate("/add")}>Add Student</button>
      {/* Search box */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>{student.age}</td>
                <td>
                  <button onClick={() => navigate(`/students/${student.id}`)}>View</button>
                  <button onClick={() => navigate(`/edit/${student.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No students found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;