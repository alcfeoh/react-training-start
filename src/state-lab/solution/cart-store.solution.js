import { create } from 'zustand';

/**
 * Worked solution for lab SM1.
 *
 * Three things worth pointing out on the day:
 *  - no provider, no context: `create` returns a hook and that is the API;
 *  - `set` is a shallow merge, so returning `{ items: ... }` leaves the
 *    actions untouched;
 *  - the store is a plain object outside React, which is why the test next
 *    to this file needs no renderer at all.
 */
export const useCartStore = create((set) => ({
  items: [],

  addItem: (plate) => set((state) => ({ items: [...state.items, plate] })),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((p) => p._id !== id) })),

  clear: () => set({ items: [] }),
}));
