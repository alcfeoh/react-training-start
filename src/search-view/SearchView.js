import React, {useState} from 'react';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {PLATES} from './plates';
import {PlateRow} from './PlateRow';

/**
 * The search page, at /search. It works - it is just slow.
 *
 * Lab: find out why, with the Profiler, before changing anything.
 * The worked version is in SearchView.solution.js.
 */

/** Accent- and case-insensitive. Correct, but it allocates a new string and walks it twice. */
function normalize(value) {
	return String(value)
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase();
}

/**
 * How many rows the page paints. This is the knob: if your laptop is fast
 * enough that the lag below is not obvious, turn it up.
 */
const VISIBLE_ROWS = 1000;

function search(plates, query) {
	const needle = normalize(query);
	if (!needle) {
		return plates;
	}
	return plates.filter(
		(plate) =>
			normalize(plate.title).includes(needle) ||
			normalize(plate.state).includes(needle) ||
			normalize(plate.description).includes(needle)
	);
}

export function SearchView() {

	const [query, setQuery] = useState('');
	const [cart, setCart] = useState([]);

	const currency = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	const results = search(PLATES, query);

	const addToCart = (plate) => setCart((current) => [...current, plate]);

	return (
		<>
			<Jumbotron title="Search" description="Every plate we have ever sold"/>
			<div className="container">

				<input
					className="form-control mb-3"
					placeholder="Search 20 000 plates..."
					aria-label="Search plates"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>

				<p className="text-muted">
					{results.length} plates found - {cart.length} in the cart
				</p>

				<ul className="list-group">
					{results.slice(0, VISIBLE_ROWS).map((plate) => (
						<PlateRow
							key={plate._id}
							plate={plate}
							currency={currency}
							onAddToCart={addToCart}
						/>
					))}
				</ul>
			</div>
		</>
	);
}
