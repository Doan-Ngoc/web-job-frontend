import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Sidebar from "./components/Sidebar/Sidebar";
import JobDescription from "./pages/JobDescription/JobDescription";
import JobContext from "./contexts/JobContext";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="App">
      <JobContext.Provider>
        <Sidebar setCurrentPage={setCurrentPage} />
        <section className="page-content p-20 overflow-y-scroll">
          <Routes>
            <Route
              path="/"
              element={
                <Homepage
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              }
            />
            <Route path="/job/search" element={<SearchPage />} />
            <Route path="/job/:jobId" element={<JobDescription />} />
          </Routes>
        </section>
      </JobContext.Provider>
    </div>
  );
}

export default App;
