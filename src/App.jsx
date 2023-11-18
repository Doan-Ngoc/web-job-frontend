import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedRoute from './components/private-route';
import JobDescription from './pages/JobDescription/JobDescription';
import JobContext from './contexts/JobContext';
import SearchPage from './pages/SearchPage/SearchPage';
import CreateJobNews from './pages/CreateJobNews/CreateJobNews';
import jobFields from '../jobFields.json';
import RecruiterJobList from './pages/RecruiterJobList/RecruiterJobList';
import EditJob from './pages/EditJob/EditJob';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  //Fetch job field list
  return (
    <div className="App">
      <JobContext.Provider value={{ jobFields }}>
        <Sidebar setCurrentPage={setCurrentPage} />
        <section className="page-content overflow-y-scroll">
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
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/job/search" element={<SearchPage />} />
            <Route path="/job/:jobId" element={<JobDescription />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/job/created" element={<RecruiterJobList />} />
              <Route path="/job/new" element={<CreateJobNews />} />
              <Route path="/job/edit/:jobId" element={<EditJob />} />
              <Route path="/job/restore/:jobId" element={<EditJob />} />
            </Route>
          </Routes>
        </section>
      </JobContext.Provider>
    </div>
  );
}

export default App;
