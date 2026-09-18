import React from 'react';
import {Link} from 'react-router-dom';
import {CurrencyDropdown} from '../currency/CurrencyDropdown';

/**
 * App-shell navigation: dark fixed bar, branding, the three view links,
 * and the currency dropdown (currency is lifted to App).
 */
export function Navigation(props) {

	return (
		<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
			<Link className="navbar-brand" to="/">License Plate Store</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarsExampleDefault"
				aria-controls="navbarsExampleDefault"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarsExampleDefault">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/cart">My cart</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/checkout">Checkout</Link>
					</li>
				</ul>
				<CurrencyDropdown currency={props.currency} onCurrencyChange={props.onCurrencyChange}/>
				<form className="form-inline my-2 my-lg-0" onSubmit={(event) => event.preventDefault()}>
					<input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
					<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
	);
}
