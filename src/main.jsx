import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { getAccessToken } from './api/authenticate.jsx';
import { authActions } from './features/auth/auth-slice.jsx';
import { verifyAccessToken } from './api/authenticate.jsx';
import App from './App.jsx';
import './index.css';

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
