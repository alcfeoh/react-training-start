import React from 'react';
import './CurrencyDropdown.css';

const CURRENCIES = [
	{code: 'USD', label: 'USD ($)'},
	{code: 'EUR', label: 'EUR (€)'},
	{code: 'GBP', label: 'GBP (£)'},
];

export class CurrencyDropdown extends React.Component {

	state = {
		showItems: false
	};

	select(code) {
		this.setState({showItems: false});
		this.props.onCurrencyChange(code);
	}

	render() {
		return (
			<div className="btn-group margin10">
				<button type="button" onClick={() => this.setState({showItems: true})}
					className="btn btn-info dropdown-toggle" data-toggle="dropdown">
					{this.props.currency}
				</button>
				<div className={this.state.showItems ? "dropdown-menu show" : "dropdown-menu"}>
					{CURRENCIES.map(({code, label}) => (
						<a key={code} className="dropdown-item" onClick={() => this.select(code)}>
							{label}
						</a>
					))}
				</div>
			</div>
		);
	}
};
