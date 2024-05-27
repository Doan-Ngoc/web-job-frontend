import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedRoute from './components/private-route';
import JobDescription from './pages/JobDescription/JobDescription';
import JobContext from './contexts/JobContext';
import { AuthProvider } from './contexts/AuthContext';
import SearchPage from './pages/SearchPage/SearchPage';
import CreateJobNews from './pages/CreateJobNews/CreateJobNews';
import jobFields from '../jobFields.json';
import RecruiterJobList from './pages/RecruiterJobList/RecruiterJobList';
import EditJob from './pages/EditJob/EditJob';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import * as authApi from './api/authenticate'
import CompanyProfile from './pages/ProfilePage/NewCompanyProfile'
import ProfilePageWrapper from './pages/ProfilePage/ProfilePageWrapper';
import { ErrorPage } from './pages/errors/ErrorPage';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const accessToken = localStorage.getItem('accessToken');
  // //Check login status
  // const checkLoginStatus = async () => {
  //   if (accessToken) {
  //     const response = await authApi.verifyAccessToken(accessToken);
  //     if (response) {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   }
  //   else {
  //     setIsLoggedIn(false);
  //   }
  // }
  // useEffect(() => {
  //   checkLoginStatus();
  // }, [isLoggedIn]);
  return (
    <div className="App">
      <AuthProvider>
      <JobContext.Provider value={{ jobFields }}>
        <Sidebar setCurrentPage={setCurrentPage}/>
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
            <Route path="/signup" element={<Signup/>} />
            <Route path="/company/profile" element={<CompanyProfile />} />
            <Route path="/profile" element={<ProfilePageWrapper />} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/job/search" element={<SearchPage />} />
            <Route path="/job/:jobId" element={<JobDescription />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/job/created" element={<RecruiterJobList />} />
              <Route path="/job/new" element={<CreateJobNews />} />
              <Route path="/job/edit/:jobId" element={<EditJob />} />
              <Route path="/job/restore/:jobId" element={<EditJob />} />
              <Route path = "/error" element={<Error />} />
            </Route>
          </Routes>
        </section>
      </JobContext.Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
