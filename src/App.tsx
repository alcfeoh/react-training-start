import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import {Jumbotron} from './jumbotron/Jumbotron';
import {StoreView} from './store-view/StoreView';
import {CartView} from './cart-view/CartView';
import {CheckoutView} from './checkout-view/CheckoutView';
import {CurrencyDropdown} from './currency/CurrencyDropdown';
import {PromoBanner} from './promo-banner/PromoBanner';
import {getCurrencySymbols} from './license-plate/LicensePlate.service';

/**
 * The license plate store, assembled: navigation, three routes, and the
 * currency lifted up to here so every plate shows the same symbol.
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
				<nav className="navbar navbar-expand navbar-light bg-light">
					<Link className="navbar-brand" to="/">License plates</Link>
					<div className="navbar-nav mr-auto">
						<Link className="nav-item nav-link" to="/cart">My cart</Link>
						<Link className="nav-item nav-link" to="/checkout">Checkout</Link>
					</div>
					<CurrencyDropdown currency={currency} onCurrencyChange={setCurrency}/>
				</nav>
				<main role="main">
					<Routes>
						<Route
							path="/"
							element={
								<>
									<Jumbotron
										title="License plates"
										description="Rare plates from all fifty states"
									/>
									<div className="container">
										<PromoBanner/>
									</div>
									<StoreView currencySymbol={currencySymbol}/>
								</>
							}
						/>
						<Route path="/cart" element={<CartView currencySymbol={currencySymbol}/>}/>
						<Route path="/checkout" element={<CheckoutView/>}/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
};
