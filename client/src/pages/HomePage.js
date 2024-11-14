// src/pages/HomePage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  // Check if user is authenticated and if they are an admin
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.isAdmin;

  // Logout function to clear local storage and redirect to home page
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <h1>Blogging Website</h1>
        <div className="nav-buttons">
          {token ? (
            <>
              {isAdmin && (
                <Link to="/dashboard">
                  <button className="nav-btn">Dashboard</button>
                </Link>
              )}
              <button className="nav-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="nav-btn">Sign In</button>
              </Link>
              <Link to="/signup">
                <button className="nav-btn">Get Started</button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <main className="main-content">
        <h1>Welcome to the Blogging Website</h1>
        <p>Explore and read amazing blogs here.</p>
        <Link to={token ? "/content" : "/login"}>
          <button className="start-reading-btn">Start Reading</button>
        </Link>
      </main>
    </div>
  );
}

export default HomePage;
