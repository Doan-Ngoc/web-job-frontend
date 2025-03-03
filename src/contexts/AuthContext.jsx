import { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/authenticate';
import { request, setUpdateAccessToken } from '../utils/request';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountRole, setAccountRole] = useState();
  const [accountId, setAccountId] = useState();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  // useEffect(() => {
  //   if (accessToken) {
  //     setAuthToken(accessToken); // ✅ Automatically update token in Axios
  //   }
  // }, [accessToken]);

  useEffect(() => {
    setUpdateAccessToken(setAccessToken); // ✅ Now interceptors can update the token
  }, [setAccessToken]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoadingAuth(true);
      try {
        //Try reissue the access token if the user has a valid refresh token
        if (!accessToken) {
          setIsLoggedIn(false);
          setAccountRole('');
          setAccountId('');
          delete request.defaults.headers.common["Authorization"];
        } else {
          //Verify access token if it's available
          const response = await authApi.verifyAccessToken(accessToken);
          setAccountRole(response.user.role);
          setAccountId(response.user.id);
          setIsLoggedIn(true);
          request.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        // handleLogout();
      }
      setLoadingAuth(false);
    };
    checkLoginStatus();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        loadingAuth,
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
        accountId,
        accountRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
