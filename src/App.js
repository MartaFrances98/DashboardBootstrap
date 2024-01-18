import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Grafos from './Grafos';
import Administration from './Administration';
import Login from './Login';
import ProtectedRoute from './Componentes/protectedRoutes.jsx';
import './css/Styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/grafos" element={
          <ProtectedRoute>
            <Grafos />
          </ProtectedRoute>
        } />
        <Route path="/Administration" element={
          <ProtectedRoute>
            <Administration />
          </ProtectedRoute>
        } />
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;


