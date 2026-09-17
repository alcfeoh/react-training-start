import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './auth-context.solution';

export function LoginView() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await login(username, password);
      const from = location.state?.from?.pathname ?? '/';
      navigate(from, { replace: true });
    } catch (problem) {
      setError('Login failed. Try again.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '420px' }}>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <button className="btn btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
