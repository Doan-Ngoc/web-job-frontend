import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

export default function ProtectedRoute() {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState.isLogined) {
      toast.error('Unable to identify your credentials. Please login!');
      navigate('/signin');
    }
  }, []);

  return <Outlet />;
}
