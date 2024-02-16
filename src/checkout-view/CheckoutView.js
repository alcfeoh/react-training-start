import React from 'react';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {CheckoutForm} from '../checkout-form/CheckoutForm';

export function CheckoutView() {

		return (
			<>
				<Jumbotron title="Checkout" description="Enter your personal information to complete your order"/>
				<div className="container">
					<CheckoutForm></CheckoutForm>
				</div>
			</>
		);
}
