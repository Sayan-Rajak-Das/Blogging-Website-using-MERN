// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">

      <nav className="navbar">
        <Link to="/" className="home-button">Go to WelcomePage</Link>
      </nav>
      
      <div className="dashboardbody">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin dashboard! This area is restricted to admin users.</p>
      </div>
    </div>
  );
}

export default Dashboard;