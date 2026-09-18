# Lab PERF1 — Diagnose and fix

The search page lives at **http://localhost:3000/search**, reachable from the
**Search** link in the navigation bar. Nothing to mount, nothing to comment out:
start the app as usual and go to the page.

`plates.js` builds a 20 000-plate catalog out of `mock-data.js`, and the page paints
the first **1000** matches. Nothing is fetched, so the lab works with the backend
server stopped.

**If the lag is not obvious on your machine, turn up `VISIBLE_ROWS` in
`SearchView.js`.** That constant is the knob — the page renders that many rows, and
that is where most of the per-keystroke cost lives.

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
| One long task per keystroke | the filter re-runs over 20 000 plates **and** 1000 rows re-render, on every keystroke | `useMemo` on the result |
| The 1000 rows re-render even when you only add to the cart | `currency` and `addToCart` are new objects on every render, so `memo()` on `PlateRow` never hits | `useMemo` / `useCallback`, **then** `memo` on the row |
| The input lags behind your typing | rendering the list is urgent work that blocks the keystroke | `useDeferredValue` on the query |

Note the order: `memo()` on `PlateRow` alone changes **nothing** until the props
keep a stable identity. That is the point worth making on the day.

The worked solution is in `SearchView.solution.js` and `PlateRow.solution.js`,
with the three fixes numbered in the comments.

## Measured, so you know what to expect

Typing six characters 60 ms apart, in a headless Chromium on a cloud container
(a laptop will be two or three times faster, so scale accordingly):

| | total for 6 keystrokes | longest blocking task |
|---|---|---|
| as shipped | 1480 ms | **339 ms** |
| after the three fixes | 702 ms | **67 ms** |

The number that matters is the second one: above ~100 ms a keystroke feels late.
That is what the participant should see disappear.

## The objection you will get, and the honest answer

Someone will say you should not render a thousand rows at all — window the list,
paginate, use `react-window`. They are right, and that is the real fix in a real
app. Say it before they do. The lab is not an argument for memoizing your way out
of a bad list; it is about seeing *where* the time goes and what each tool
actually buys you. `useDeferredValue` in particular only helps because the work is
spread over a thousand components React can interrupt — put the same cost inside
one long synchronous function and it buys you almost nothing.
