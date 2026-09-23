import { create } from 'zustand';
import {addToCart, getCartContents, removeFromCart} from "./cart-service.ts";
import {devtools} from "zustand/middleware";

export const useCartStore = create(devtools((set, get) => ({
  items: [],
  error: null,
  loading: true,

  load: () => {
    return setInterval(async () => {
      set({loading: true, error: null}, false, "load/setLoading");
      const plates = await getCartContents();
      set({items: plates, loading: false, error: null});
    }, 10000);
  },

  addItem: async (plate) => {
    set({loading: true, error: null}, false, "addItem/setLoading");
    try {
      await addToCart(plate);
      const plates = await getCartContents();
        set({items: plates, loading: false, error: null});
    } catch {
      set({loading: false, error: "Could not add plate to cart"}, false, "addItem/setError");
    }
    },

  removeItem: async (plate) => {
    set({loading: true, error: null}, false, "removeItem/setLoading");
    await removeFromCart(plate);
    const plates = await getCartContents();
    set({items: plates, loading: false, error: null});
  },
})));
