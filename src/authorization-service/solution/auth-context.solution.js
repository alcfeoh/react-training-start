import React, { createContext, useContext, useMemo, useState } from 'react';
import { login as loginRequest } from '../login-service';

const AuthContext = createContext(null);

/**
 * Worked solution for lab AU1.
 *
 * The session is a piece of ordinary React state. What makes it an auth
 * context rather than a global variable is that it is the ONLY place that
 * knows the token, and that it is memoized so consumers do not re-render
 * on every provider render.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      accessToken: session?.accessToken ?? null,

      login: async (username, password) => {
        const { token } = await loginRequest(username, password);
        if (!token) {
          throw new Error('No token in the login response');
        }
        setSession({ user: username, accessToken: token });
        return token;
      },

      logout: () => setSession(null),
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
