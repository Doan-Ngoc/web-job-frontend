import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const CompanyOnly = () => {
  const navigate = useNavigate();
  const {accountRole} = useAuth();
  useEffect(() => {
    if (accountRole !== "company") {
      // toast.error('Unable to identify your credentials. Please login!');
      navigate('/error/no-permission');
    }
  }, []);
  return (
    <Outlet />
  )
}

export default CompanyOnly