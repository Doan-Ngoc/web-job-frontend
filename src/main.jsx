import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { getAccessToken } from './api/auth.jsx';
import { authActions } from './features/auth/auth-slice.jsx';
import { verifyAccessToken } from './api/auth.jsx';
import App from './App.jsx';
import './index.css';

// async function loadLoginState() {
//   // const refreshToken = localStorage.getItem('refreshToken');
//   // if (!refreshToken) {
//   //   store.dispatch(authActions.logout());
//   // } else {
//   //   try {
//   //     const response = await getAccessToken(refreshToken);
//   //     localStorage.setItem('refreshToken', response.data.refreshToken);
//   //     store.dispatch(authActions.login(response.data));
//   //   } catch (_) {
//   //     store.dispatch(authActions.logout());
//   //   }
//   // }
//   const accessToken = localStorage.getItem('accessToken');
//   if (!accessToken) {
//     console.log("current state log out")
//     store.dispatch(authActions.logout());
//     return; // Exit early if no access token is found
//   }
//   try {
//     // Verify the access token
//     const response = await verifyAccessToken(accessToken);
//     if (response.ok) {
//       // If the access token is valid, consider the user logged in
//       console.log("current state log in")
//       const userData = await response.json();
//       store.dispatch(authActions.login({ user: userData, accessToken }));
//     } else {
//       // If the access token is expired or invalid, log the user out
//       store.dispatch(authActions.logout());
//     }
//   } catch (error) {
//     // If an error occurs during token verification, log the user out
//     console.error('Error verifying access token:', error);
//     store.dispatch(authActions.logout());
//   }
// }

// loadLoginState().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
// });
