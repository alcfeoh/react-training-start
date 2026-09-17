import React, { createContext, useContext, useMemo, useState } from 'react';
import { login as loginRequest } from './login-service';

const AuthContext = createContext(null);

/**
 * Lab AU1 - the session.
 *
 * One place owns the session, and it lives in memory: not in localStorage,
 * not in sessionStorage. A refresh logs the user out, and that is the
 * trade-off we are making on purpose.
 *
 * Three TODOs. The worked version is in solution/auth-context.solution.js.
 */
export function AuthProvider({ children }) {
  // TODO 1 - hold the session here: null, or { user, accessToken }.
  const [session, setSession] = useState(null);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      accessToken: session?.accessToken ?? null,

      // TODO 2 - call loginRequest(username, password), and put what comes
      // back in the session. The backend answers { token: '...' }.
      login: async (username, password) => {
        console.warn('login is not implemented yet', username);
      },

      // TODO 3 - end the session.
      logout: () => {
        console.warn('logout is not implemented yet');
      },
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
