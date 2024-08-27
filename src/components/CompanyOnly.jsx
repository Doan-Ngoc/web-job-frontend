import React from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const CompanyOnly = () => {
  const navigate = useNavigate();
  const {accountRole, isLoggedIn} = useAuth();

  return accountRole === "company" ? <Outlet /> : <Navigate to="/error/no-permission" />;
  
}

export default CompanyOnly