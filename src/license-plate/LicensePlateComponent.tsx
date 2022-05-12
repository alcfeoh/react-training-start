import React, {Component} from 'react';
import './LicensePlateComponent.css';
import {LicensePlate} from "../license-plate";
import {Currency} from "../currency/CurrencyDropdown";

export interface LicensePlateComponentProps {
	plate: LicensePlate,
	buttonText: string,
	currencyInfo: {currency: Currency, exchangeRate: number};
}

const CURRENCIES = {
	"USD": "$",
	"EUR": "€",
	"GBP": "£"
}

export class LicensePlateComponent extends Component<LicensePlateComponentProps, {}> {

	buttonClicked = () => {
		alert("Plate added to cart");
	}

	render() {
		const plate = this.props.plate;
		const {currency, exchangeRate = 1} = this.props.currencyInfo;
		return (
			<>
			<h2>
				{plate.title}
				{plate.onSale && <img src={process.env.PUBLIC_URL + "/sale.png"} /> }
			</h2>
			<img src={plate.picture} className="img-fluid" />
			<p>{plate.description}</p>
			<div>
			<h2 className="float-left">{CURRENCIES[currency]}{plate.price / exchangeRate}</h2>
			<button className="btn btn-primary float-right" role="button" onClick={this.buttonClicked}>
				{this.props.buttonText}
			</button>
			</div>
			</>
		);
	}

}