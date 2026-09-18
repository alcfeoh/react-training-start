import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import {Navigation} from './navigation/Navigation';
import {StoreView} from './store-view/StoreView';
import {CartView} from './cart-view/CartView';
import {CheckoutView} from './checkout-view/CheckoutView';
import {SearchView} from './search-view/SearchView';
import {getCurrencySymbols} from './license-plate/LicensePlate.service';

/**
 * The license plate store, assembled: navigation in the app shell, three
 * routes, and the currency lifted up to here so every plate shows the same
 * symbol. Each view owns its own Jumbotron.
 *
 * This is the starting point of the advanced course. A few things are
 * deliberately left undone - they are the first labs:
 *
 *   TS1  the Jumbotron still says "Title" and "Description"
 *   CC3  the "Add to cart" button does nothing yet
 */
export function App() {

	const [currency, setCurrency] = useState('USD');
	const [symbols, setSymbols] = useState<Record<string, string>>({});

	useEffect(() => {
		getCurrencySymbols().then(setSymbols);
	}, []);

	const currencySymbol = symbols[currency] ?? '';

	return (
		<BrowserRouter>
			<div className="App">
				<Navigation currency={currency} onCurrencyChange={setCurrency}/>
				<main role="main">
					<Routes>
						<Route path="/" element={<StoreView currencySymbol={currencySymbol}/>}/>
						<Route path="/cart" element={<CartView currencySymbol={currencySymbol}/>}/>
						<Route path="/checkout" element={<CheckoutView/>}/>
						<Route path="/search" element={<SearchView/>}/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
};
