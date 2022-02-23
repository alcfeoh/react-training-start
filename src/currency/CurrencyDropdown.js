import React from 'react';
import './CurrencyDropdown.css';

class CurrencyDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			showItems: false,
			currency: 'USD'
		};
    }
	render() {
		return (
			<div className="btn-group margin10">
				<button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown">{this.state.currency}</button>
				<div className={this.state.showItems? "dropdown-menu show" : "dropdown-menu"}>
				<a className="dropdown-item">USD ($)</a>
				<a className="dropdown-item">EUR (€)</a>
				<a className="dropdown-item">GBP (£)</a>
				</div>
			</div>
		);
	}
};
	
export default CurrencyDropdown;