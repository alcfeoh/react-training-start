import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './auth-context';

/**
 * TODO 4 - a guard is a route that renders its children only when the
 * session says so.
 *
 * Send an unauthenticated visitor to /login, and remember where they were
 * going so LoginView can send them back:
 *
 *   <Navigate to="/login" replace state={{ from: location }} />
 *
 * `replace` keeps the login page out of the browser history, so the back
 * button does not bounce the user between the two.
 *
 * When the user IS authenticated, render <Outlet /> - the nested route.
 */
export function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  return <Outlet />; // TODO 4
}
