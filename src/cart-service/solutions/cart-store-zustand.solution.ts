import {create, ExtractState} from 'zustand';
import {addToCart, getCartContents, removeFromCart} from "../cart-service.ts";
import {combine, devtools} from "zustand/middleware";
import {LicensePlateData} from "../../license-plate-data.type.ts";

export const useCartStore = create(
	devtools(
		combine({
			items: [] as LicensePlateData[],
			error: null as string | null,
			loading: true,
			intervalId:  undefined as number | undefined
			},
			(set, get) => ({
		load: () => {
		if (! get().intervalId) {
			const id = setInterval(async () => {
				set({loading: true, error: null}, false, "load/setLoading");
				const plates = await getCartContents();
				set({items: plates, loading: false, error: null});
			}, 10000);
			set({intervalId: id});
		}
	},

	stopPolling: () => {
		if (get().intervalId) {
			clearInterval(get().intervalId);
		}
	},

	addItem: async (plate: LicensePlateData) => {
		set({loading: true, error: null}, false, "addItem/setLoading");
		try {
			await addToCart(plate);
			const plates = await getCartContents();
			set({items: plates, loading: false, error: null});
		} catch {
			set({loading: false, error: "Could not add plate to cart"}, false, "addItem/setError");
		}
	},

	removeItem: async (plate: LicensePlateData) => {
		set({loading: true, error: null}, false, "removeItem/setLoading");
		await removeFromCart(plate);
		const plates = await getCartContents();
		set({items: plates, loading: false, error: null});
	},
}))));

export type CartState = ExtractState<typeof useCartStore>;
