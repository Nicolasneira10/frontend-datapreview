// Este codigo es el controlador de rutas

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainApp from './MainApp';
import ProtectedRoute from './components/ProtectedRoute'; // Asegúrate de la ruta
import Landing from './components/Landing';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
            element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
