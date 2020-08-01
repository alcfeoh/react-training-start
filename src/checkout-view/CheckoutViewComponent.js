import React from 'react';
import JumbotronTemplate from '../jumbotron/JumbotronTemplate';
import CheckoutFormComponent from '../checkout-form/CheckoutFormComponent';
class CheckoutViewComponent extends React.Component {
	render() {
		return (
			<>
			<JumbotronTemplate title="Checkout" description="Enter your personal information to complete your order"/>
			<div className="container">
			<CheckoutFormComponent></CheckoutFormComponent>
			</div>
			</>
		);
	}
};

export default CheckoutViewComponent;