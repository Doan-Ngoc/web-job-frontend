import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/authenticate';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  const checkLoginStatus = async () => {
    if (accessToken) {
      const response = await authApi.verifyAccessToken(accessToken);
      if (response) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, accessToken, setAccessToken, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
