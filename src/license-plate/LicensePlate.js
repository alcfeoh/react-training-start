import React from 'react';
import './LicensePlate.css';

export function LicensePlate(props) {

	const {plate, buttonText, currencySymbol} = props;

	return (
			<>
				<h2>{plate.title}</h2>
				<img src={plate.picture} className="img-fluid" alt={plate.title} />
				<p>{plate.description}</p>
				<div>
				<h2 className="float-left">{currencySymbol}{plate.price}</h2>
				{/* Lab CC3: this button does not do anything yet. */}
				<button className="btn btn-primary float-right" role="button">
					{buttonText}
				</button>
				</div>
			</>
		);
}
