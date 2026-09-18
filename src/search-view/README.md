# Lab PERF1 — Diagnose and fix

The search page lives at **http://localhost:3000/search**, reachable from the
**Search** link in the navigation bar. Nothing to mount, nothing to comment out:
start the app as usual and go to the page.

`plates.js` expands the 15 plates of `mock-data.js` into a 4000-entry catalog,
so nothing is fetched — the page works with the backend server stopped.

## The challenge

1. Before touching anything, type a few characters and write down which
   components you think re-render on each keystroke.
2. Open the React DevTools Profiler, record one keystroke, and turn on
   *Record why each component rendered*. Compare with your prediction.
3. Fix it, then record again and compare the commit durations.

**BONUS:** turn the React Compiler on and delete the manual memoization you
just added. This repo is on React 19, so the compiler does not need a separate
`react-compiler-runtime` package — enable `babel-plugin-react-compiler` through
`@vitejs/plugin-react` if you want a 5-minute demo.

## What is actually wrong (trainer notes)

Three separate problems, deliberately stacked:

| Symptom in the Profiler | Cause | Fix |
|---|---|---|
| One very long commit per keystroke | `search()` walks 4000 plates and calls `normalize()` on three fields of each, on every render | `useMemo` on the result |
| The 100 rows re-render even when adding to the cart | `currency` and `addToCart` are new objects on every render, so `memo()` on `PlateRow` would never hit | `useMemo` / `useCallback`, then `memo` on the row |
| The input itself feels laggy | the filtering is urgent work blocking the keystroke | `useDeferredValue` on the query |

Note the order: `memo()` on `PlateRow` alone changes **nothing** until the props
keep a stable identity. That is the point worth making on the day.

The worked solution is in `SearchView.solution.js` and `PlateRow.solution.js`,
with the three fixes numbered in the comments.
