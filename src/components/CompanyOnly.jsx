import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CompanyOnly = () => {
  const { accountRole } = useAuth();

  return accountRole === 'company' ? (
    <Outlet />
  ) : (
    <Navigate to="/error/no-permission" />
  );
};

export default CompanyOnly;
