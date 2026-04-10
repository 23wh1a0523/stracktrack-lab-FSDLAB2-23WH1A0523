import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-student-id": "23WH1A05XX"
      }
    })
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h1>Student Details</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Course:</strong> {student.course}</p>
      <p><strong>Age:</strong> {student.age}</p>
      <button onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
}

export default StudentDetails;