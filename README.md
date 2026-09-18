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

## Code labs

Most labs are done **in the app itself**: you edit a file you already know, and a worked
solution sits beside it under the same name plus `.solution`.

| Lab | You edit | Solution |
|---|---|---|
| HK1 — the cart hook, with `useReducer` | `src/cart-service/cart-hook.ts` | `cart-hook.solution.ts` (+ `cart-hook.solution.test.ts`) |
| EB1 — catching a render crash | you create `src/cart-view/ErrorBoundary.js` | `src/cart-view/ErrorBoundary.solution.js` |
| RC1 — keys and reconciliation | `src/cart-view/CartView.js` | `src/cart-view/CartView.keys.solution.js` |

Four labs are self-contained instead, because each needs data or a setup of its own:
`src/perf-lab/` (profiling), `src/state-lab/` (Zustand), `src/authorization-service/` (auth)
— each with its own README — and the Playwright lab in `e2e/`.

## CI

Pull requests and pushes to `master` run GitHub Actions: `npm ci`, typecheck, production build, and `npm run test:ci`. Playwright e2e is not part of CI. `Jumbotron.test.js` is excluded because it is an intentional TDD lab that fails on a fresh clone.

## TypeScript

This starter is a Vite + React 19 TypeScript app with `strict` enabled.

- **`.tsx` required props are checked.** If a TypeScript component declares required props and another `.tsx` file omits them, `npm run typecheck` and `npm run build` fail. `skipLibCheck` and `allowJs` do not turn that off.
- **`.js` lab files are not type-checked.** `allowJs` is on so labs can stay `.js` without renaming. `checkJs` is off, so an untyped `.js` component (for example `LicensePlate.js`) will not report missing props when you call it from TypeScript.
- **Vite overlay.** `npm start` / `npm run dev` use `vite-plugin-checker` so missing required props also show in the terminal and the browser overlay.
