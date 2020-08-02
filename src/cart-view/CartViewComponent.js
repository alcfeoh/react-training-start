import React from 'react';
import {LicensePlateComponent} from '../LicensePlateComponent';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {getCartContents} from '../cart-service/cart-service';
import {removeFromCart} from '../cart-service/cart-service';

export class CartViewComponent extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            cartContents: []
		};
		this.removeItemFromCart = this.removeItemFromCart.bind(this);
	}

	async componentDidMount() {
		let cartContents = await getCartContents();
		this.setState({cartContents : cartContents});
	}

	async removeItemFromCart(plate) {
		await removeFromCart(plate);
		let newCartContents = this.state.cartContents.filter((item) => item._id !== plate._id);
		this.setState({cartContents : newCartContents});
	}

	render() {
		let rows;
		if (this.state.cartContents) {
			rows = this.state.cartContents.map((licensePlate, index) => {
				return (
					<div key={licensePlate._id} className="col-md-4" style={{backgroundColor: (index % 2 === 0) ? '#F5F5F5' : ''}}>
						<LicensePlateComponent currency={this.props.currency} plate={licensePlate} buttonText="Remove from cart &times;"
						buttonClicked={this.removeItemFromCart} />
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

