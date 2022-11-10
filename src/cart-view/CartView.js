import React from 'react';
import {LicensePlate} from '../license-plate/LicensePlate';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {getCartContents} from '../cart-service/cart-service';
import {removeFromCart} from '../cart-service/cart-service';

export class CartView extends React.Component {

	state = {
		cartContents: []
	};

	async componentDidMount() {
		let cartContents = await getCartContents();
		this.setState({cartContents : cartContents});
	}

	 removeItemFromCart = (plate) => {
		// TODO
	}

	render() {
		let rows;
		if (this.state.cartContents) {
			rows = this.state.cartContents.map((licensePlate, index) => {
				return (
					<div key={licensePlate._id} className="col-md-4" style={{backgroundColor: (index % 2 === 0) ? '#F5F5F5' : ''}}>
						<LicensePlate currency={this.props.currency} plate={licensePlate} buttonText="Remove from cart &times;" />
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
}

