import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/private-route';
import ProfileRequired from './components/require-profile';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import Homepage from './pages/Homepage/Homepage';
import SearchPage from './pages/SearchPage/SearchPage';
import JobDescription from './pages/JobDescription/JobDescription';
import { NewBusinessProfile } from './pages/NewProfile/Company';
import { NewEmployeeProfile } from './pages/NewProfile/Employee';
import { InternalServerError } from './pages/errors/Internal';
import { NotFoundPage } from './pages/errors/Notfound';
import SidebarLayout from './layout/with-sidebar';
import JobContext from './contexts/JobContext';
// import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile/new/employee" element={<NewEmployeeProfile />} />
        <Route path="/profile/new/company" element={<NewBusinessProfile />} />
        <Route element={<ProfileRequired />}>
          <Route path="/home" element={<Homepage />} />
        </Route>
      </Route>
      <Route path="/error/500" element={<InternalServerError />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
