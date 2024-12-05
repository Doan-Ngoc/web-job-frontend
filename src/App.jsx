import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedRoute from './components/ProtectedRoutes';
import CompanyOnly from './components/CompanyOnly';
import ApplicantOnly from './components/ApplicantOnly';
import JobDescription from './pages/JobDescription/JobDescription';
import { JobProvider } from './contexts/JobContext';
import { AuthProvider } from './contexts/AuthContext';
import SearchPage from './pages/SearchPage/SearchPage';
import CreateJob from './pages/CreateJob/CreateJob';
import RecruiterJobList from './pages/RecruiterJobList/RecruiterJobList';
import ManageApplicationsForApplicant from './pages/ManageApplications/ManageApplicationsForApplicant';
import ManageApplicationsForCompany from './pages/ManageApplications/ManageApplicationsForCompany';
import EditJob from './pages/EditJob/EditJob';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import ProfilePageWrapper from './pages/ProfilePage/MyProfileWrapper';
import CompanyProfile from './pages/ProfilePage/CompanyProfile';
import NewCompanyProfile from './pages/ProfilePage/NewCompanyProfile';
import ApplicantProfile from './pages/ProfilePage/ApplicantProfile';
import NewApplicantProfile from './pages/ProfilePage/NewApplicantProfile';
import Loading from './components/Loading';
import { ErrorPage } from './pages/errors/ErrorPage';
import { NoPermission } from './pages/errors/NoPermission';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <JobProvider>
          <Sidebar />

          <section className="page-content overflow-y-scroll">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/loading" element={<Loading />} />
              <Route
                path="/profile/company/:accountId"
                element={<CompanyProfile />}
              />
              <Route
                path="/profile/company/create"
                element={<NewCompanyProfile />}
              />
              <Route
                path="/profile/applicant/create"
                element={<NewApplicantProfile />}
              />
              <Route
                path="/profile/applicant/:accountId"
                element={<ApplicantProfile />}
              />
              <Route path="/signin" element={<Signin />} />
              <Route path="/job/search" element={<SearchPage />} />

              {/* Routes that require login */}
              <Route element={<ProtectedRoute />}>
                <Route path="/my-profile" element={<ProfilePageWrapper />} />

                <Route element={<CompanyOnly />}>
                  <Route path="/job/created" element={<RecruiterJobList />} />
                  <Route path="/job/new" element={<CreateJob />} />
                  <Route path="/job/edit/:jobId" element={<EditJob />} />
                  <Route path="/job/restore/:jobId" element={<EditJob />} />
                  <Route
                    path="/job/applications/:jobId"
                    element={<ManageApplicationsForCompany />}
                  />
                </Route>

                <Route element={<ApplicantOnly />}>
                  <Route
                    path="/job/applied"
                    element={<ManageApplicationsForApplicant />}
                  />
                </Route>
              </Route>

              <Route path="/job/:jobId" element={<JobDescription />} />
              <Route path="/error/no-permission" element={<NoPermission />} />
              <Route path="/error/500" element={<ErrorPage />} />
            </Routes>
          </section>
        </JobProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
