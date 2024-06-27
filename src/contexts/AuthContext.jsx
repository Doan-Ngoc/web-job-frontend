import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/authenticate';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountRole, setAccountRole] = useState('')
  const [accountId, setAccountId] = useState()
  const [loadingAuth, isLoadingAuth] = useState(true)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const checkLoginStatus = async () => {
    if (accessToken) {
      const response = await authApi.verifyAccessToken(accessToken);
      if (response) {
        console.log('auth context run')
        setIsLoggedIn(true);
        localStorage.setItem('login status', true);
        setAccountRole(response.user.role)
        setAccountId(response.user.id)
      } else {
        setIsLoggedIn(false);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        localStorage.setItem('login status', false);
      }
    } else {
      setIsLoggedIn(false);
    }
    isLoadingAuth(false)
  };

  useEffect(() => {
    checkLoginStatus();
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{loadingAuth, isLoggedIn, setIsLoggedIn, accessToken, setAccessToken, checkLoginStatus, accountId, accountRole }}>
      {children}
    </AuthContext.Provider>
  );
};
