import React, {useEffect, useState} from 'react';
import {getLicensePlates} from '../license-plate/plate-service';
import {LicensePlate} from '../license-plate/LicensePlate';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {Spinner} from '../spinner/Spinner';
import {LicensePlateData} from '../license-plate-data.type';

export interface StoreViewProps {
	currency: string;
}

/**
 * The store: every license plate the API knows about.
 *
 * The "Add to cart" button is deliberately inert - wiring it is lab CC3.
 */
export function StoreView(props: StoreViewProps) {

	const [plates, setPlates] = useState<LicensePlateData[] | null>(null);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		let cancelled = false;

		getLicensePlates()
			.then(data => {
				if (!cancelled) {
					setPlates(data);
				}
			})
			.catch(() => {
				if (!cancelled) {
					setFailed(true);
				}
			});

		return () => {
			cancelled = true;
		};
	}, []);

	let body;
	if (failed) {
		body = (
			<div className="container">
				<div className="alert alert-danger" role="alert">
					The license plate API is not answering. Start it with <code>npm run server</code>.
				</div>
			</div>
		);
	} else if (!plates) {
		body = <Spinner/>;
	} else {
		body = (
			<div className="container">
				<div className="row">
					{plates.map((plate, index) => (
						<div
							key={plate._id}
							className="col-md-4"
							style={{backgroundColor: (index % 2 === 0) ? '#F5F5F5' : ''}}
						>
							<LicensePlate
								plate={plate}
								currency={props.currency}
								buttonText="Add to cart"
							/>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<>
			<Jumbotron title="Welcome to our store" description="Browse our collection"/>
			{body}
		</>
	);
}
