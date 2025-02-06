import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ApplicantOnly = () => {
  const { accountRole } = useAuth();

  return accountRole === 'applicant' ? (
    <Outlet />
  ) : (
    <Navigate to="/error/no-permission" />
  );
};

export default ApplicantOnly;
