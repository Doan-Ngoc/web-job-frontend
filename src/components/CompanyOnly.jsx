import React from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const CompanyOnly = () => {
  const navigate = useNavigate();
  const {accountRole, isLoggedIn} = useAuth();
  // if (loadingAuth) {
  //   return <div>Loading...</div>;
  // }

  return accountRole === "company" ? <Outlet /> : <Navigate to="/error/no-permission" />;
  // useEffect(() => {
  //   if (accountRole !== "company") {
  //     console.log('not company')
  //     console.log('status log in', isLoggedIn)
  //     // toast.error('Unable to identify your credentials. Please login!');
  //     navigate('/error/no-permission');
  //   }
  // }, []);
  // return (
  //   <Outlet />
  // )
}

export default CompanyOnly