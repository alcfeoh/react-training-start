# Lab SM1: The cart, with Zustand

Support for the state-management chapter. Everything here is self-contained:
no other lab file is touched, no backend server is needed, so this can be run
at any point in the training.

## Running it

Render `StateLab` from `App.tsx` (and put your own `App` content back
afterwards):

```jsx
import { StateLab } from './state-lab/StateLab';

export function App() {
  return <StateLab />;
}
```

Then `npm run dev` (or `npm start`) and open http://localhost:3000.
The catalog renders, the cart stays empty: nothing is wired yet.

## The challenge

Five TODOs, in three files:

| File | TODO | What to write |
|---|---|---|
| `cart-store.js` | 1 | `items`, the state: an empty array |
| `cart-store.js` | 2 | `addItem(plate)` |
| `cart-store.js` | 3 | `removeItem(id)` |
| `StoreView.js` | 4 | read `addItem` with a selector |
| `CartPanel.js` | 5 | read `items` and `removeItem` with selectors |

Two rules for the store: `set` takes the current state and returns **only the
part that changes**, and you never mutate `items` in place - a new array every
time, or the components that read it will not re-render.

Two rules for the components: one selector per value, and no props. The cart
panel and the catalog never talk to each other.

**BONUS 1:** compare this with the `useCart` hook in `src/cart-service/`.
Which part of the cart really needed a client store?

**BONUS 2:** open the React DevTools Profiler, record an "Add to cart", and
check which components re-rendered. Then replace the selector in `CartPanel`
with `useCartStore((state) => state)` and record again.

## Trainer notes

**Bonus 1 is the point of the whole chapter.** In this app the cart is
*server state*: `useCart` calls `GET /cart`, `PUT /cart/:id`, `DELETE
/cart/:id`, and what it holds is a copy of something the backend owns. Putting
that in a Zustand store buys nothing - two sources of truth instead of one,
and you write the caching, the refetch and the invalidation yourself. TanStack
Query (chapter 22) is the tool for that half.

The lab store is honest about it: it never fetches. It is the *client* half -
what is in the cart right now, in this tab, before anything is sent. That
distinction is what the participants should leave with; the Zustand syntax
takes five minutes, this takes the whole chapter.

**Bonus 2** shows why a selector is not a detail: `(state) => state` returns a
new object on every change, so every consumer re-renders on every action.
`(state) => state.items` re-renders only the cart panel. If someone selects
several values at once and gets a render loop, that is `useShallow` from
`zustand/react/shallow` - worth showing only if the question comes up.

**Common stumbles**

- `set({ items: [...] })` instead of `set((state) => ({ items: [...] }))` when
  the new value depends on the old one. Works until two actions land in the
  same tick.
- `items.push(plate)` then `set({ items })`. Same array reference, no re-render.
  This one is worth letting them hit.
- Calling the hook as `useCartStore()` with no selector. It works, and it
  re-renders on everything.

The worked solution is in `solution/`, with a test next to it that drives the
store with `getState()` / `setState()` and no renderer at all - the "the store
works outside React too" line from the slide, checked. Run it with
`npx vitest run src/state-lab`.
