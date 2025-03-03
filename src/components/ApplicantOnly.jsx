import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ApplicantOnly = () => {
  const { accountRole } = useAuth();

  return accountRole === 'applicant' ? (
    <Outlet />
  ) : (
    <Navigate to="/error/no-permission" />
  );
};

export default ApplicantOnly;
