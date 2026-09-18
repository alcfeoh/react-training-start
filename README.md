# React Training

See [React Training set-up document](https://bit.ly/at-react-setup) for instructions to prepare for doing the code labs.

## Scripts

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite dev server at http://localhost:3000 |
| `npm start` | Same as `npm run dev` (kept for existing lab instructions) |
| `npm run build` | Typecheck, then create a production build |
| `npm run preview` | Preview the production build |
| `npm test` | Run unit tests once (Vitest) |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:ci` | Same as `npm test`, excluding `Jumbotron.test.js` (used by GitHub Actions) |
| `npm run typecheck` | Run the TypeScript checker |
| `npm run server` | Start the license plate API on port 8000 |
| `npm run e2e` | Run Playwright end-to-end tests |
| `npm run e2e:ui` | Open the Playwright UI |

## Starting point of the advanced course

`npm install`, `npm run server` (the API, port 8000), `npm start` (the app, port 3000).

The store is assembled and running: a `Navigation` bar in the app shell, four routes
(`/`, `/search`, `/cart`, `/checkout`), a Jumbotron in each view, the plates loaded from the API
(with a sale badge when `onSale` is true), a controlled checkout form, and the currency
lifted up to `App.tsx`. Two things are left undone on purpose, and they are the first
two labs:

- the page headers show **Title** and **Description** — the `Jumbotron` ignores the props it
  is given (lab **TS1**);
- the **Add to cart** button does nothing (lab **CC3**).

## Code labs

Most labs are done **in the app itself**: you edit a file you already know, and a worked
solution sits beside it under the same name plus `.solution`.

| Lab | You edit | Solution |
|---|---|---|
| TS1 — typing the Jumbotron | `src/jumbotron/Jumbotron.js` → `.tsx` | `src/jumbotron/Jumbotron.solution.tsx` |
| HK1 — the cart hook, with `useReducer` | `src/cart-service/cart-hook.ts` | `cart-hook.solution.ts` (+ `cart-hook.solution.test.ts`) |
| EB1 — catching a render crash | you create `src/cart-view/ErrorBoundary.js` | `src/cart-view/ErrorBoundary.solution.js` |
| RC1 — keys and reconciliation | `src/cart-view/CartView.js` | `src/cart-view/CartView.keys.solution.js` |
| PERF1 — diagnose and fix the search page | `src/search-view/SearchView.js` | `SearchView.solution.js` (+ `PlateRow.solution.js`) |

PERF1 runs on its own page, `/search`, built from a generated 4000-plate catalog so it
needs no backend — see `src/search-view/README.md` for the trainer notes.

Two labs are self-contained instead, because each needs a setup of its own:
`src/state-lab/` (Zustand) and `src/authorization-service/` (auth) — each with its own
README — plus the Playwright lab in `e2e/`.

## CI

Pull requests and pushes to `master` run GitHub Actions: `npm ci`, typecheck, production build, and `npm run test:ci`. Playwright e2e is not part of CI. `Jumbotron.test.js` is excluded because it is an intentional TDD lab that fails on a fresh clone.

## TypeScript

This starter is a Vite + React 19 TypeScript app with `strict` enabled.

- **`.tsx` required props are checked.** If a TypeScript component declares required props and another `.tsx` file omits them, `npm run typecheck` and `npm run build` fail. `skipLibCheck` and `allowJs` do not turn that off.
- **`.js` lab files are not type-checked.** `allowJs` is on so labs can stay `.js` without renaming. `checkJs` is off, so an untyped `.js` component (for example `LicensePlate.js`) will not report missing props when you call it from TypeScript.
- **Vite overlay.** `npm start` / `npm run dev` use `vite-plugin-checker` so missing required props also show in the terminal and the browser overlay.
