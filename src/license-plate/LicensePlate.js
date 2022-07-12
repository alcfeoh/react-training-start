import React, {Component} from 'react';
import './LicensePlate.css';

export class LicensePlate extends Component {

	render() {
		const plate = this.props.plate;
		return (
			<>
			<h2>{plate.title}</h2>
			<img src={plate.picture} className="img-fluid" />
			<p>{plate.description}</p>
			<div>
			<h2 className="float-left">$xx</h2>
			<button className="btn btn-primary float-right" role="button">
				{this.props.buttonText}
			</button>
			</div>
			</>
		);
	}

}