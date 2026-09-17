import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth-context.solution';
import { RequireAuth } from './RequireAuth.solution';
import { LoginView } from './LoginView.solution';

// The backend stub always answers with the same token, so the test does
// not need a server - only a promise.
vi.mock('../login-service', () => ({
  login: vi.fn(async () => ({ token: '1abcd21atsampletoken21' })),
}));

function renderAt(path) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<h1>The store</h1>} />
          <Route path="/login" element={<LoginView />} />
          <Route element={<RequireAuth />}>
            <Route path="/checkout" element={<h1>Checkout</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

async function signIn() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Username'), 'alain');
  await user.type(screen.getByLabelText('Password'), 'whatever');
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
}

describe('guarded routes', () => {
  it('sends an anonymous visitor from /checkout to the login page', () => {
    renderAt('/checkout');

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Checkout' })).toBeNull();
  });

  it('sends them back to /checkout once they sign in', async () => {
    renderAt('/checkout');

    await signIn();

    expect(
      await screen.findByRole('heading', { name: 'Checkout' })
    ).toBeInTheDocument();
  });

  it('falls back to the home page when there is nowhere to return to', async () => {
    renderAt('/login');

    await signIn();

    expect(
      await screen.findByRole('heading', { name: 'The store' })
    ).toBeInTheDocument();
  });

  it('leaves public routes alone', () => {
    renderAt('/');

    expect(screen.getByRole('heading', { name: 'The store' })).toBeInTheDocument();
  });
});
