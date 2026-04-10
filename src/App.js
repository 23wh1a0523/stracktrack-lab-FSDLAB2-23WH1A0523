import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./components/list";
import AddStudent from "./components/add";
import EditStudent from "./components/edit";
import StudentDetails from "./components/details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/students/:id" element={<StudentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;