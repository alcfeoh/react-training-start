import React from "react";

/**
 * Lab TS1 - typing the Jumbotron.
 *
 * Worked solution. Do the lab in `Jumbotron.js` first: rename it to
 * `Jumbotron.tsx`, then make `Jumbotron.test.js` pass.
 *
 * Two details worth a minute on the day:
 *
 * - `description` is optional because the test only passes a title. The type
 *   has to describe every legitimate call site, not the most convenient one.
 *
 * - The rename to `.tsx` is the whole point. Leave the file as `.js` and you
 *   can write any type you like: `checkJs` is off in tsconfig.json, so nothing
 *   is ever checked. Types you cannot rely on are worse than no types.
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
