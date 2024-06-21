import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function ProtectedRoute() {
  // const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {isLoggedIn, loadingAuth} = useAuth();
  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     // toast.error('Unable to identify your credentials. Please login!');
  //     console.log('need login', isLoggedIn)
  //     navigate('/signin');
  //   }
  // }, []);

  // return <Outlet />;
}
