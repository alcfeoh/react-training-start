import React, {Component} from 'react';
import './LicensePlate.css';

export function LicensePlate(props) {

	const {plate, buttonText} = props;

	return (
			<>
				<h2>{plate.title}</h2>
				<img src={plate.picture} className="img-fluid" />
				<p>{plate.description}</p>
				<div>
				<h2 className="float-left">$xx</h2>
				<button className="btn btn-primary float-right" role="button">
					{buttonText}
				</button>
				</div>
			</>
		);
	}

}
