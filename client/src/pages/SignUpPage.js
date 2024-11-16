import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedBlogTypes, setSelectedBlogTypes] = useState([]);
  const navigate = useNavigate();

  const blogTypes = ["Technology", "Health", "Travel", "Education", "Food"];

  const handleToggleBlogType = (type) => {
    setSelectedBlogTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type) // Remove if already selected
        : [...prevTypes, type] // Add if not selected
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Send signup data to the backend
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        isAdmin: false,
        visibleBlogTypes: selectedBlogTypes, // Pass selected blog types
      });

      // Log the user in after signup
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const token = loginResponse.data.token;
      const user = loginResponse.data.user;

      if (!token || !user) {
        throw new Error('Signup successful, but failed to log in.');
      }

      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage

      navigate('/content'); // Redirect to blogging content page
    } catch (error) {
      console.error('Sign-up error:', error.response ? error.response.data : error.message);
      alert('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <div className="blog-types">
          <h4>Select Blog Types (Optional):</h4>
          <div className="blog-type-buttons">
            {blogTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`blog-type-button ${selectedBlogTypes.includes(type) ? 'selected' : ''}`}
                onClick={() => handleToggleBlogType(type)}
              >
                {selectedBlogTypes.includes(type) ? '✓ ' : ''} {type}
              </button>
            ))}
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Sign in here</Link></p>
    </div>
  );
}

export default SignUpPage;
