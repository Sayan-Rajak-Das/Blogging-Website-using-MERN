// src/pages/BloggingContentPage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BloggingContentPage.css';

function BloggingContentPage() {
  const navigate = useNavigate();

  // Logout function to clear local storage and redirect to home page
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="bloggingcontentpage">
      
      <nav className="navbar">
        <Link to="/" className="nav-btn">Home</Link>
        <button className="nav-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="blogging-content">
        <header className="blog-header">
          <h1>Welcome to the Blogging Content Page</h1>
          <p>Read, write, and explore amazing blogs here!</p>
        </header>
        <section className="blog-content">
          {/* Placeholder content */}
          <article className="blog-post">
            <h2>Blog Post Title 1</h2>
            <p>This is a sample blog post content. Here you can add more information, insights, or thoughts...</p>
          </article>
          <article className="blog-post">
            <h2>Blog Post Title 2</h2>
            <p>Explore more interesting blog posts on various topics...</p>
          </article>
          {/* Add more blog articles as needed */}
        </section>
      </div>
    </div>
  );
}

export default BloggingContentPage;
