import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic form validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // Add your login logic here (making an API request)
    try {
      const response = await axios.post('/api/login', { email, password });
      // If login successful, redirect or handle accordingly
      console.log('Login successful');
    } catch (error :any) {
      // If login failed, handle error
      if (error.response) {
        // Server responded with error status code (e.g., 401 Unauthorized)
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else {
        // Other errors (e.g., network error)
        console.error('Login failed:', error.message);
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <style jsx>{`
        div {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        div > div {
          margin-bottom: 10px;
        }
        label {
          font-weight: bold;
        }
        input[type='email'],
        input[type='password'] {
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Login;