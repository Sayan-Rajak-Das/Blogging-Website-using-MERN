// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import BloggingContentPage from './pages/BloggingContentPage';

// Utility functions to check authentication and roles
const isAuthenticated = () => localStorage.getItem('token') !== null;
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.isAdmin;
};

// Protected Route Component for Admin Only
const AdminProtectedRoute = ({ children }) => {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/content" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/content" element={isAuthenticated() ? <BloggingContentPage /> : <Navigate to="/login" />} />
        
        {/* Admin-only Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
