// src/pages/SignInPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const token = response.data.token;
      const user = response.data.user;
  
      if (!token || !user) {
        throw new Error("Invalid response structure: missing token or user");
      }
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Redirect based on user role
      navigate(user.isAdmin ? '/dashboard' : '/content');
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert('Sign-in failed. Please check your credentials and try again.');
    }
  };
  
  

  return (
    <div className="auth-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
}

export default SignInPage;
