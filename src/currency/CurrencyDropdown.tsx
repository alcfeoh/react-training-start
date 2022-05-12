import React, {useState} from 'react';
import './CurrencyDropdown.css';

export type Currency = "USD" | "EUR" | "GBP";

export interface CurrencyDropdownProps {
	currency: Currency;
	onCurrencyChange: (curr: Currency) => void;
}

function CurrencyDropdown(props: CurrencyDropdownProps){

	const [showItems, setShowItems] = useState<boolean>(false);

	document.addEventListener("click", () => {
		if (showItems)
			setShowItems(false);
	});

		return (
			<div className="btn-group margin10">
				<button type="button" onClick={() => setShowItems(true)}
					className="btn btn-info dropdown-toggle" data-toggle="dropdown">
					{props.currency}
				</button>
				<div className={showItems? "dropdown-menu show" : "dropdown-menu"}>
					<a className="dropdown-item" onClick={() => props.onCurrencyChange('USD')}>
						USD ($)
					</a>
					<a className="dropdown-item" onClick={() => props.onCurrencyChange('EUR')}>
						EUR (€)
					</a>
					<a className="dropdown-item" onClick={() => props.onCurrencyChange('GBP')}>
						GBP (£)
					</a>
				</div>
			</div>
		);
};
	
export default CurrencyDropdown;
