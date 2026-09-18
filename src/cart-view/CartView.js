import React from 'react';
import {LicensePlate} from '../license-plate/LicensePlate';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {useCart} from "../cart-service/cart-hook";


export function CartView(props) {

	const [cartContents] = useCart();

	const removeItemFromCart = (plate) => {
		// TODO
	}

	let rows;
	if (cartContents) {
		rows = cartContents.map((licensePlate, index) => {
			return (
				<div key={licensePlate._id} className="col-md-4" style={{backgroundColor: (index % 2 === 0) ? '#F5F5F5' : ''}}>
					<LicensePlate currency={props.currency} plate={licensePlate} buttonText="Remove from cart &times;" />
				</div>
			);
		});
	}
	return (
		<>
			<Jumbotron title="My Cart" description="Your current cart contents:"/>
			<div className="container">
				{rows && rows.length === 0 && <div className="alert alert-info" role="alert">Your cart is empty</div>}
				<div className="row" >
					{rows}
				</div>
				<hr/>
			</div>
		</>
	);
}

