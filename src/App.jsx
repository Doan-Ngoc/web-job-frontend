import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <section className="page-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
