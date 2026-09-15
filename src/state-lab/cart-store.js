import { create } from 'zustand';

/**
 * Lab SM1 - the cart, with Zustand.
 *
 * `create` takes a function that receives `set` and returns the initial
 * state plus the actions that change it. What comes back is a hook.
 *
 * Three TODOs. The worked store is in solution/cart-store.solution.js -
 * try the whole thing before opening it.
 */
export const useCartStore = create((set) => ({
  // TODO 1 - the state: an empty array of plates.
  items: [],

  // TODO 2 - add a plate to the cart.
  // `set` receives the current state and returns the part that changes.
  addItem: (plate) => {
    console.warn('addItem is not implemented yet', plate);
  },

  // TODO 3 - remove a plate by its _id.
  // Same idea, with a filter. Never mutate `items` in place.
  removeItem: (id) => {
    console.warn('removeItem is not implemented yet', id);
  },
}));
