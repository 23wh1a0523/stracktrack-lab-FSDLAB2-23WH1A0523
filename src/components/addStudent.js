import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [course, setCourse] = useState(""); 
  const [age, setAge] = useState(""); 
  const navigate = useNavigate();

  const rollNumber = "23WH1A0523"; 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-student-id": rollNumber
      },
      body: JSON.stringify({ name, email, course, age }),
    })
      .then(() => navigate("/"))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required /><br/>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br/>
        <input type="text" placeholder="Course" value={course} onChange={e => setCourse(e.target.value)} required /><br/>
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required /><br/>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;