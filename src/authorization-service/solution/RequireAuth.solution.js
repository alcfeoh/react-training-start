import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './auth-context.solution';

export function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // replace: the login page never lands in the history.
    // state: where they were going, so we can send them back.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
