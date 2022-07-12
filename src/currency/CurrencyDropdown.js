import React from 'react';
import './CurrencyDropdown.css';

export class CurrencyDropdown extends React.Component {

	state = {
		showItems: false,
		currency: 'USD'
	};

	render() {
		return (
			<div className="btn-group margin10">
				<button type="button" onClick={() => this.setState({showItems: true})}
					className="btn btn-info dropdown-toggle" data-toggle="dropdown">
					{this.state.currency}
				</button>
				<div className={this.state.showItems? "dropdown-menu show" : "dropdown-menu"}>
					<a className="dropdown-item" onClick={() => this.setState({showItems: false, currency: 'USD'})}>
						USD ($)
					</a>
					<a className="dropdown-item" onClick={() => this.setState({showItems: false, currency: 'EUR'})}>
						EUR (€)
					</a>
					<a className="dropdown-item" onClick={() => this.setState({showItems: false, currency: 'GBP'})}>
						GBP (£)
					</a>
				</div>
			</div>
		);
	}
};
