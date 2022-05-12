import React from 'react';
import './App.css';
import {Navigation} from "./navigation/Navigation";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {StoreViewComponent} from "./store-view/StoreViewComponent";
import {CartViewComponent} from "./cart-view/CartViewComponent";
import {CheckoutViewComponent} from "./checkout-view/CheckoutViewComponent";
import CurrencyDropdown, {Currency} from "./currency/CurrencyDropdown";

export interface AppState {
	currency: Currency;
	exchangeRates: {[key: string]: number }
}

class App extends React.Component<{}, AppState> {

	state: AppState = {currency: "USD", exchangeRates: {}};

	componentDidMount() {
		fetch("http://localhost:8000/rates")
			.then(r => r.json())
			.then(exchangeRates => this.setState({exchangeRates}))
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
				<header className="App-header">
				</header>
					<Navigation>
						<button>Hello</button>
						<CurrencyDropdown currency={this.state.currency}
										  onCurrencyChange={(currency: Currency) => this.setState({currency})} />
					</Navigation>
					<main role="main">
						<Routes>
							<Route path="/" element={<StoreViewComponent
								currencyInfo={{currency: this.state.currency, exchangeRate: this.state.exchangeRates[this.state.currency] || 1} } />}></Route>
							<Route path="cart" element={<CartViewComponent />}></Route>
							<Route path="checkout" element={<CheckoutViewComponent />}></Route>
						</Routes>
					</main>
				</div>
			</BrowserRouter>
		);
	}
};

export default App;
