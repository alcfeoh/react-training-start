import React from "react";

/**
 * Lab TS1 - making the Jumbotron dynamic.
 *
 * Worked solution. Do the lab in `Jumbotron.js` first: turn the hard-coded
 * title and description into props, rename the file to `.tsx`, and type those
 * props. StoreView, CartView, and CheckoutView already pass a title and a
 * description — once Jumbotron reads them, each page header becomes real.
 *
 * Two details worth a minute on the day:
 *
 * - `title` is required, `description` is not. Once that is written down,
 *   TypeScript can hold you to it: `StoreView.tsx` is TypeScript, so forgetting
 *   the title is reported in the terminal and in the browser overlay before the
 *   page is even reloaded. That is the moment the lab is built around.
 *
 * - The rename to `.tsx` is the point. Leave the file as `.js` and you can
 *   write any type you like: `checkJs` is off in tsconfig.json, so nothing is
 *   ever checked. Types you cannot rely on are worse than no types.
 */
interface JumbotronProps {
	title: string;
	description?: string;
}

export function Jumbotron({title, description}: JumbotronProps) {

	return (
		<div className="jumbotron">
			<div className="container">
				<h1 className="display-3">{title}</h1>
				<p>{description}</p>
			</div>
		</div>
	);
}

/**
 * Each view already renders a Jumbotron, for example StoreView:
 *
 *   <Jumbotron
 *     title="Welcome to our store"
 *     description="Browse our collection"
 *   />
 *
 * Then delete `title=` and watch what happens.
 */
