import {useEffect, useReducer} from "react";
import {addToCart, getCartContents, removeFromCart} from "./cart-service";
import {LicensePlateData} from '../license-plate-data.type';

/**
 * Lab HK1 - the cart hook, rewritten with useReducer.
 *
 * Worked solution. The exercise is to rewrite `cart-hook.ts` in place;
 * open this file once yours works, or when you are stuck.
 *
 * Two things change compared to the useState version:
 *
 * 1. Four pieces of state (items, loading, error, a snapshot to roll back to)
 *    move into ONE reducer. They always change together, so they belong
 *    together: no more "which setState do I forget this time".
 *
 * 2. The cart updates on screen BEFORE the server answers, and rolls back
 *    if the request fails. That is the part you can actually see: stop the
 *    backend (`npm run server`) and click "Add to cart".
 */

export type CartState = {
	items: LicensePlateData[];
	/** The list as the server last confirmed it. Where a failed write goes back to. */
	confirmed: LicensePlateData[];
	pending: boolean;
	error: string | null;
};

export type CartAction =
	| {type: 'loaded'; items: LicensePlateData[]}
	| {type: 'added'; plate: LicensePlateData}
	| {type: 'removed'; plate: LicensePlateData}
	| {type: 'failed'; message: string};

const INITIAL_STATE: CartState = {
	items: [],
	confirmed: [],
	pending: true,
	error: null,
};

/**
 * A reducer is a pure function: same state + same action, same result.
 * No fetch, no setTimeout, no console.log in here - which is exactly why
 * it is the easiest part of the hook to unit test.
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'loaded':
			// The server has spoken: this is the new truth on both sides.
			return {items: action.items, confirmed: action.items, pending: false, error: null};

		case 'added':
			// Optimistic: show it now, keep `confirmed` untouched as our way back.
			return {...state, items: [...state.items, action.plate], pending: true, error: null};

		case 'removed':
			return {
				...state,
				items: state.items.filter((plate) => plate._id !== action.plate._id),
				pending: true,
				error: null,
			};

		case 'failed':
			// Roll back to the last confirmed list and say why.
			return {...state, items: state.confirmed, pending: false, error: action.message};

		default:
			return state;
	}
}

export type CartStatus = {pending: boolean; error: string | null};

export type CartFeatures = [
	LicensePlateData[],
	(plate: LicensePlateData) => Promise<LicensePlateData[]>,
	(plate: LicensePlateData) => Promise<LicensePlateData[]>,
	CartStatus,
];

export function useCart(): CartFeatures {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	useEffect(() => {
		let cancelled = false;

		getCartContents()
			.then((items: LicensePlateData[]) => {
				if (!cancelled) {
					dispatch({type: 'loaded', items});
				}
			})
			.catch(() => {
				if (!cancelled) {
					dispatch({type: 'failed', message: 'Could not load the cart'});
				}
			});

		// The effect cleans up after itself: a cart that unmounts mid-request
		// must not dispatch into a component that is gone.
		return () => {
			cancelled = true;
		};
	}, []);

	const addPlateToCart = async (plate: LicensePlateData) => {
		dispatch({type: 'added', plate});
		try {
			await addToCart(plate);
			const items = await getCartContents();
			dispatch({type: 'loaded', items});
			return items;
		} catch {
			dispatch({type: 'failed', message: `Could not add ${plate.title} to the cart`});
			return state.confirmed;
		}
	};

	const removePlateFromCart = async (plate: LicensePlateData) => {
		dispatch({type: 'removed', plate});
		try {
			await removeFromCart(plate);
			const items = await getCartContents();
			dispatch({type: 'loaded', items});
			return items;
		} catch {
			dispatch({type: 'failed', message: `Could not remove ${plate.title} from the cart`});
			return state.confirmed;
		}
	};

	return [state.items, addPlateToCart, removePlateFromCart, {pending: state.pending, error: state.error}];
}
