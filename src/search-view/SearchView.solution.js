import React, {useCallback, useDeferredValue, useMemo, useState} from 'react';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {PLATES} from './plates';
import {PlateRow} from './PlateRow.solution';

/**
 * Lab PERF1 - the search page, fixed.
 *
 * Worked solution. Profile `SearchView.js` first and write your diagnosis
 * down before reading this: the three fixes below only make sense once you
 * have seen the three problems in the Profiler.
 */

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
const VISIBLE_ROWS = 10000;

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

export function SearchViewSolution() {

	const [query, setQuery] = useState('');
	const [cart, setCart] = useState([]);

	// 1. The input stays urgent, the list is allowed to lag behind.
	const deferredQuery = useDeferredValue(query);
	const isStale = query !== deferredQuery;

	// 2. The expensive work only runs when the deferred query changes,
	//    not on every keystroke and not when the cart changes.
	const results = useMemo(() => search(PLATES, deferredQuery), [deferredQuery]);

	// 3. Stable identities, so memo() on PlateRow can actually do its job.
	const currency = useMemo(
		() => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}),
		[]
	);
	const addToCart = useCallback(
		(plate) => setCart((current) => [...current, plate]),
		[]
	);

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

				<ul className="list-group" style={{opacity: isStale ? 0.6 : 1}}>
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

/**
 * THE ORDER MATTERS, AND IT IS THE POINT OF THE LAB
 *
 * `memo()` on PlateRow alone changes nothing: `currency` and `addToCart` are
 * new objects on every render, so every row sees new props and re-renders
 * anyway. Wrap them in useMemo / useCallback first, and only then does memo()
 * start paying.
 *
 * Adding memoization everywhere "just in case" is how people conclude that
 * React optimisation does not work. Measure, find the identity that is
 * breaking, fix that one.
 *
 * WHY useDeferredValue EARNS ITS PLACE HERE
 *
 * Because the expensive part is a thousand components, and React can stop
 * between components to let a keystroke through. Move the same cost into one
 * long synchronous function and useDeferredValue buys you almost nothing -
 * React cannot interrupt a function that is already running. Worth knowing
 * before reaching for it.
 *
 * AND THE HONEST CAVEAT
 *
 * The real fix for a thousand-row list is to not render a thousand rows:
 * window it. This lab is about seeing where the time goes and what each tool
 * actually buys, not an argument for memoizing your way out of a bad list.
 */
