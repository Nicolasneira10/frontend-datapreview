import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { DataContextProvider } from './context/DataContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataContextProvider>
      <GoogleOAuthProvider clientId="195211552518-kv3l2a10g34amb3ut7fk8khdjrsihia7.apps.googleusercontent.com">      
      <App />      
      </GoogleOAuthProvider>
    </DataContextProvider>
  </React.StrictMode>
);
