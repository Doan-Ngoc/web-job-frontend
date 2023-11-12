import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { getAccessToken } from './api/auth.jsx';
import { authActions } from './features/auth/auth-slice.jsx';
import App from './App.jsx';
import './index.css';

async function loadLoginState() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    store.dispatch(authActions.logout());
  } else {
    try {
      const response = await getAccessToken(refreshToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      store.dispatch(authActions.login(response.data));
    } catch (_) {
      store.dispatch(authActions.logout());
    }
  }
}

loadLoginState().then(() => {
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
});
