# Lab PERF1 — Diagnose and fix

The search page lives at **http://localhost:3000/search**, reachable from the
**Search** link in the navigation bar. Nothing to mount, nothing to comment out:
start the app as usual and go to the page.

`plates.js` builds a 20 000-plate catalog out of `mock-data.js`, and the page paints
the first `VISIBLE_ROWS` matches — currently **10 000**. Nothing is fetched, so the
lab works with the backend server stopped.

`VISIBLE_ROWS` is the knob: the page renders that many rows, and that is where most
of the per-keystroke cost lives. Turn it down if the room's machines are slow, up if
the lag is not obvious.

**Keep the two copies in sync.** The constant is declared in `SearchView.js` **and**
in `SearchView.solution.js`. If they differ, the before/after comparison measures the
row count instead of the three fixes.

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
| One long task per keystroke | the filter re-runs over 20 000 plates **and** every visible row re-renders, on every keystroke | `useMemo` on the result |
| The rows re-render even when you only add to the cart | `currency` and `addToCart` are new objects on every render, so `memo()` on `PlateRow` never hits | `useMemo` / `useCallback`, **then** `memo` on the row |
| The input lags behind your typing | rendering the list is urgent work that blocks the keystroke | `useDeferredValue` on the query |

Note the order: `memo()` on `PlateRow` alone changes **nothing** until the props
keep a stable identity. That is the point worth making on the day.

The worked solution is in `SearchView.solution.js` and `PlateRow.solution.js`,
with the three fixes numbered in the comments.

## Measured, so you know what to expect

Typing six characters 60 ms apart, dev server, headless Chromium on a cloud
container. **A laptop is two or three times faster, so scale these down.** The
number that matters is the longest blocking task: above ~100 ms a keystroke feels
late.

Longest blocking task, at four settings of `VISIBLE_ROWS`:

| `VISIBLE_ROWS` | as shipped | after the three fixes |
|---|---|---|
| 1 000 | 324 ms | **108 ms** |
| 2 000 | 412 ms | **114 ms** |
| 3 000 | 390 ms | **152 ms** |
| 10 000 *(current)* | 1093 ms | **338 ms** |

The ratio is what holds across machines: the three fixes cut the longest task by
about **3×**, whatever the row count. The absolute numbers are container numbers.

Picking a value: too low and nobody sees a problem, too high and the *fixed*
version is still visibly late, which undercuts the lesson. Aim for a setting where
"as shipped" is unmistakably janky and "fixed" feels instant on the machines in the
room — on a fast laptop that is around 10 000, on a slow one closer to 2 000. Try it
once on the day's hardware before the lab.

## The objection you will get, and the honest answer

Someone will say you should not render thousands of rows at all — window the list,
paginate, use `react-window`. They are right, and that is the real fix in a real
app. Say it before they do. The lab is not an argument for memoizing your way out
of a bad list; it is about seeing *where* the time goes and what each tool
actually buys you. `useDeferredValue` in particular only helps because the work is
spread over a thousand components React can interrupt — put the same cost inside
one long synchronous function and it buys you almost nothing.
