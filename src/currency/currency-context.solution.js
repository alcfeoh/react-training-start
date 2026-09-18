import React, {createContext, useContext, useMemo, useState} from 'react';

/**
 * Lab CX1 - the currency, without prop drilling.
 *
 * Worked solution. Do the lab first: today `App` owns the currency and hands
 * it down through `StoreView` and `CartView`, neither of which uses it. They
 * only pass it on, which is the definition of prop drilling.
 */

const CurrencyContext = createContext(null);

export function CurrencyProvider({children}) {

	const [currency, setCurrency] = useState(
		() => new URLSearchParams(window.location.search).get('currency') ?? 'USD'
	);

	/**
	 * `useMemo` is not decoration here. Without it, this object is new on every
	 * render of the provider, so every consumer re-renders even when the
	 * currency has not changed. The context value is exactly the kind of
	 * identity that has to stay stable.
	 */
	const value = useMemo(() => ({currency, setCurrency}), [currency]);

	return (
		<CurrencyContext.Provider value={value}>
			{children}
		</CurrencyContext.Provider>
	);
}

/**
 * The hook is the public API: components import this, never the context
 * object. It means you can change how the currency is stored - a reducer, a
 * store, the URL - without touching a single consumer.
 */
export function useCurrency() {
	const value = useContext(CurrencyContext);
	if (!value) {
		// Worth the three lines: without it, a component rendered outside the
		// provider gets `null` and fails somewhere far away, with a message
		// that points at the wrong file.
		throw new Error('useCurrency must be used inside a CurrencyProvider');
	}
	return value;
}

/**
 * WHAT DISAPPEARS
 *
 * App.tsx wraps its tree once:
 *
 *   <CurrencyProvider>
 *     <Navigation/>
 *     <Routes>...</Routes>
 *   </CurrencyProvider>
 *
 * and stops owning any currency state. `StoreView` and `CartView` lose the
 * prop entirely - they never wanted it. `Navigation` and `LicensePlate` call
 * `useCurrency()` where they actually need it:
 *
 *   const {currency} = useCurrency();
 *
 *
 * WORTH A MINUTE ON THE DAY
 *
 * Context is not a state manager - it is a transport. It solves "this value
 * has to reach a component eight levels down", and nothing else. Everything
 * that reads the context re-renders when the value changes, with no
 * selectors and no way to subscribe to one field. That is the wall people hit
 * when they use it as a store, and it is why chapter 5 opens with Zustand.
 *
 * The other half of the lesson: nothing here made the app faster. Prop
 * drilling is a readability problem, not a performance one.
 */
