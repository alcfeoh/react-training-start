import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth-context.solution';
import { RequireAuth } from './RequireAuth.solution';
import { LoginView } from './LoginView.solution';

function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <Link className="navbar-brand" to="/">
        License plates
      </Link>
      <div className="navbar-nav mr-auto">
        <Link className="nav-item nav-link" to="/checkout">
          Checkout
        </Link>
      </div>
      {user ? (
        <>
          <span className="navbar-text mr-3">Signed in as {user}</span>
          <button className="btn btn-sm btn-outline-secondary" onClick={logout}>
            Sign out
          </button>
        </>
      ) : (
        <Link className="nav-item nav-link" to="/login">
          Sign in
        </Link>
      )}
    </nav>
  );
}

function StoreView() {
  return (
    <div className="container">
      <h1>The store</h1>
      <p>Public. Anyone can browse it.</p>
    </div>
  );
}

function CheckoutView() {
  return (
    <div className="container">
      <h1>Checkout</h1>
      <p>Protected. You should only see this once you are signed in.</p>
    </div>
  );
}

export function AuthLab() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<StoreView />} />
          <Route path="/login" element={<LoginView />} />
          <Route element={<RequireAuth />}>
            <Route path="/checkout" element={<CheckoutView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
