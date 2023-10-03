import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Sidebar from "./components/Sidebar/Sidebar";
import JobDescription from "./pages/JobDescription/JobDescription";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <section className="page-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/job-description" element={<JobDescription />}></Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
