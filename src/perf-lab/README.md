# Code challenge: Diagnose and fix

Support for the performance chapter. Everything here is self-contained: no other
lab file is touched, so this can be run at any point in the training.

## Running it

Render `PlateSearch` from `App.tsx` (and put your own `App` content back
afterwards):

```jsx
import { PlateSearch } from './perf-lab/PlateSearch';

export function App() {
  return <PlateSearch />;
}
```

Then `npm run start` and type in the search box. It stutters.

## The challenge

1. Before touching anything, type a few characters and write down which
   components you think re-render on each keystroke.
2. Open the React DevTools Profiler, record one keystroke, and turn on
   *Record why each component rendered*. Compare with your prediction.
3. Fix it, then record again and compare the commit durations.

**BONUS:** turn the React Compiler on and delete the manual memoization you
just added. Note that this repo is still on React 18.2, so the compiler needs
the `react-compiler-runtime` package alongside the Babel plugin - worth a
5-minute demo rather than a hands-on step unless the repo moves to React 19.

## What is actually wrong (trainer notes)

Three separate problems, deliberately stacked:

| Symptom in the Profiler | Cause | Fix |
|---|---|---|
| One very long commit per keystroke | `search()` walks 4000 plates and calls `normalize()` on three fields of each, on every render | `useMemo` on the result |
| The 100 rows re-render even when adding to the cart | `currency` and `addToCart` are new objects on every render, so `memo()` on `PlateRow` would never hit | `useMemo` / `useCallback`, then `memo` on the row |
| The input itself feels laggy | the filtering is urgent work blocking the keystroke | `useDeferredValue` on the query |

Note the order: `memo()` on `PlateRow` alone changes **nothing** until the props
keep a stable identity. That is the point worth making on the day.

The worked solution is in `solution/` — `PlateSearch.solution.js` and
`PlateRow.solution.js`, with the three fixes numbered in the comments.

## Data

`plates.js` expands the 15 plates of `mock-data.js` into a 4000-entry catalog.
Nothing is fetched, so the lab works offline and without the backend server.
