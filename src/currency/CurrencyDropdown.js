import React, {useState} from 'react';
import './CurrencyDropdown.css';

const CURRENCIES = [
	{code: 'USD', label: 'USD ($)'},
	{code: 'EUR', label: 'EUR (€)'},
	{code: 'GBP', label: 'GBP (£)'},
];

export function CurrencyDropdown(props) {

	const [showItems, setShowItems] = useState(false);

	const select = (code) => {
		setShowItems(false);
		props.onCurrencyChange(code);
	};

	return (
		<div className="btn-group margin10">
			<button type="button" onClick={() => setShowItems(true)}
				className="btn btn-info dropdown-toggle" data-toggle="dropdown">
				{props.currency}
			</button>
			<div className={showItems ? "dropdown-menu show" : "dropdown-menu"}>
				{CURRENCIES.map(({code, label}) => (
					<a key={code} className="dropdown-item" onClick={() => select(code)}>
						{label}
					</a>
				))}
			</div>
		</div>
	);
}
