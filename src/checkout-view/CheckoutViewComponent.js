import React from 'react';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {CheckoutFormComponent} from '../checkout-form/CheckoutFormComponent';

export class CheckoutViewComponent extends React.Component {

	render() {
		return (
			<>
				<Jumbotron title="Checkout" description="Enter your personal information to complete your order"/>
				<div className="container">
					<CheckoutFormComponent></CheckoutFormComponent>
				</div>
			</>
		);
	}
}