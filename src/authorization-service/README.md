# Lab AU1: Guarded routes

Support for the authentication chapter. Everything here is self-contained:
no other lab file is touched, and the only backend it needs is the one that
already ships with the repo.

## Running it

Render `AuthLab` from `App.tsx` (and put your own `App` content back
afterwards):

```jsx
import { AuthLab } from './authorization-service/AuthLab';

export function App() {
  return <AuthLab />;
}
```

Then `npm run server` in one terminal, `npm run dev` in another, and open
http://localhost:3000. Click **Checkout**: nothing guards it yet, so the
protected page shows up without a login.

## About the backend

`PUT /login` on `lp-store-server` answers `{ token: '1abcd21atsampletoken21' }`
for **any** username and password. It is a stub, not an authentication
service - no verification, no expiry, no refresh endpoint. Say so out loud
during the lab: everything else here is real, that part is scaffolding.

## The challenge

Five TODOs, in three files:

| File | TODO | What to write |
|---|---|---|
| `auth-context.js` | 1 | the session state: `null` or `{ user, accessToken }` |
| `auth-context.js` | 2 | `login(username, password)` |
| `auth-context.js` | 3 | `logout()` |
| `RequireAuth.js` | 4 | redirect to `/login`, or render `<Outlet />` |
| `LoginView.js` | 5 | send the user back where they came from |

Two rules for the session: it stays **in memory** - no `localStorage`, no
`sessionStorage` - and the context value is memoized, or every consumer
re-renders on every provider render.

Two rules for the guard: use `replace` so the login page never lands in the
history, and carry the original location in the navigation state so you can
return the user to it.

**BONUS:** finish `api-fetch.js` so a 401 ends the session and sends the
user back to `/login` - **without an infinite loop**. The rule is: retry at
most once, and never with `retry` still `true`.

## Trainer notes

**The guard is not the security.** This is the line worth repeating: a
visitor who types `/checkout` into the address bar is stopped by
`RequireAuth`, and a visitor who calls the API directly is not. Only the
server can refuse. Everything in this lab is user experience built on top of
a decision that happens somewhere else.

**Why the redirect carries state.** Without `state={{ from: location }}`,
signing in drops the user on the home page and they have to find their way
back. It is two lines, and it is the difference between a demo and something
you would ship.

**Why `replace` matters.** Leave it out, press back after signing in, and the
login page returns - which redirects forward again. Participants usually
discover this by accident; it is worth letting them.

**Common stumbles**

- `useAuth()` called outside the provider. The hook throws on purpose, with a
  message that says what to do - better than the `null` dereference they
  would get otherwise.
- Forgetting `useMemo` on the context value. Nothing breaks visibly, which is
  exactly why it is worth showing in the Profiler.
- Reading `location.state.from.pathname` without the optional chaining, and
  crashing when the user reaches `/login` directly.

The worked solution is in `solution/`, with a test that drives the whole flow
through a `MemoryRouter`: anonymous visitor bounced to the login page, signed
in, returned to `/checkout`. Run it with
`npx vitest run src/authorization-service`.

## What used to be here

`AuthenticatedRoute.js` and `UnauthenticatedRoute.js` were class components
written against the react-router v5 API (`Redirect`, `<Route>` with
children). Both were deleted: `Redirect` no longer exists in v6+, so they
could not compile against the `react-router-dom` 7 this repo now uses.
