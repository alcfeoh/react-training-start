import React from 'react';
import LicensePlateComponent from '../LicensePlateComponent';
import JumbotronTemplate from '../jumbotron/JumbotronTemplate';
import {getCartContents} from '../cart-service/cart-service';
import {removeFromCart} from '../cart-service/cart-service';
class CartViewComponent extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            cartContents: null
		};
		this.removeItemFromCart = this.removeItemFromCart.bind(this);
	}

	async componentDidMount() {
		let cartContents = await getCartContents();
		this.setState({cartContents : cartContents});
	}

	async removeItemFromCart(plate) {
		await removeFromCart(plate);
		// TODO FIXME handle error condition if server fails
		let newCartContents = this.state.cartContents.filter((item) => {
			if (item._id !== plate._id) return true;
			return false;
		});
		this.setState({cartContents : newCartContents});
	}

	render() {
		let rows = null;
		if (this.state.cartContents) {
			rows = this.state.cartContents.map((licensePlate, index) => {
				return <div key={licensePlate._id} className="col-md-4" style={{backgroundColor: (index % 2 === 0) ? '#F5F5F5' : ''}}>
				<LicensePlateComponent currency={this.props.currency} plate={licensePlate} buttonText="Remove from cart &times;"
					buttonClicked={this.removeItemFromCart}/>
				</div>
			});
		}
		return (
			<>
			<JumbotronTemplate title="My Cart" description="Your current cart contents:"/>
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
};

export default CartViewComponent;
