import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const [name, setName] = useState(""); // student name
  const [email, setEmail] = useState(""); // student email
  const [course, setCourse] = useState(""); // student course
  const [age, setAge] = useState(""); // student age

  const navigate = useNavigate();
  const rollNumber = "23WH1A05XX"; // <-- replace with your roll number

  // Fetch student data by ID
  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-student-id": rollNumber
      }
    })
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setCourse(data.course);
        setAge(data.age);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "x-student-id": rollNumber
      },
      body: JSON.stringify({ name, email, course, age }),
    })
      .then(() => navigate("/")) // redirect to list after edit
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required /><br/>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required /><br/>
        <input type="text" value={course} onChange={e => setCourse(e.target.value)} required /><br/>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} required /><br/>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;