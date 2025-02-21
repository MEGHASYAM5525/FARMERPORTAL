
import React, { useState } from 'react';

const Register = ({ showLoginHandler = () => {} }) => { // Default empty function
  const API_URL = 'http://localhost:4000'; // Ensure backend is running at this port
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/buyer/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${text}`);
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        throw new Error("Server response is not in JSON format.");
      }

      alert("Buyer registered successfully");
      
      // Ensure showLoginHandler is a function before calling
      if (typeof showLoginHandler === 'function') {
        showLoginHandler();
      } else {
        console.error("showLoginHandler is not a function");
      }
      
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={registerHandler}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
