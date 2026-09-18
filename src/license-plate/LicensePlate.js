import React from 'react';
import './LicensePlate.css';

export function LicensePlate(props) {

	const {plate, buttonText, currency} = props;

	// A real store formats money. Intl also throws a RangeError on a bad
	// currency code - see lab EB1.
	const price = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(plate.price);

	return (
			<>
				<h2>
					{plate.title}
					{plate.onSale && <img src="/sale.png" className="sale" alt="On sale" />}
				</h2>
				<img src={plate.picture} className="img-fluid" alt={plate.title} />
				<p>{plate.description}</p>
				<div>
				<h2 className="float-left">{price}</h2>
				{/* Lab CC3: this button does not do anything yet. */}
				<button className="btn btn-primary float-right" role="button">
					{buttonText}
				</button>
				</div>
			</>
		);
}
