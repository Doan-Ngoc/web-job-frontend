import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedRoute from './components/ProtectedRoutes';
import CompanyOnly from './components/CompanyOnly';
import JobDescription from './pages/JobDescription/JobDescription';
import { JobProvider } from './contexts/JobContext';
import { AuthProvider } from './contexts/AuthContext';
import SearchPage from './pages/SearchPage/SearchPage';
import CreateJob from './pages/CreateJob/CreateJob';
import jobFields from '../jobFields.json';
import RecruiterJobList from './pages/RecruiterJobList/RecruiterJobList';
import EditJob from './pages/EditJob/EditJob';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import * as authApi from './api/authenticate'
import ProfilePageWrapper from './pages/ProfilePage/MyProfileWrapper';
import CompanyProfile from './pages/ProfilePage/CompanyProfile'
import NewCompanyProfile from './pages/ProfilePage/NewCompanyProfile';
import ApplicantProfile from './pages/ProfilePage/ApplicantProfile';
import NewApplicantProfile from './pages/ProfilePage/NewApplicantProfile';
import { ErrorPage } from './pages/errors/ErrorPage';
import { NoPermission } from './pages/errors/NoPermission';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="App">
      <AuthProvider>
      <JobProvider>
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
            <Route path="/profile/company/:accountId" element={<CompanyProfile />} />
            {/* <Route path="/company/profile" element={<CompanyProfile />} /> */}
            <Route path="/profile/company/create" element={<NewCompanyProfile />} />
            <Route path="/profile/applicant/create" element={<NewApplicantProfile />} />
            <Route path="/profile/applicant/:profileId" element={<ApplicantProfile />} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/job/search" element={<SearchPage />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/my-profile" element={<ProfilePageWrapper />} />
            <Route element={<CompanyOnly />}>
              <Route path="/job/created" element={<RecruiterJobList />} />
              <Route path="/job/new" element={<CreateJob />} />
              <Route path="/job/edit/:jobId" element={<EditJob />} />
              <Route path="/job/restore/:jobId" element={<EditJob />} />
              </Route>
            </Route>
            <Route path="/job/:jobId" element={<JobDescription />} />
            <Route path="/error/no-permission" element={<NoPermission />} />
            <Route path = "/error/500" element={<ErrorPage />} />
          </Routes>
        </section>
      </JobProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
