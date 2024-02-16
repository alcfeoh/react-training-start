import React from 'react';
import './App.css';

export function App() {

	let name = 'React';

	return (
		<div className="App">
			<header className="App-header">
			</header>
			{/* Add Navigation here */}
			<main role="main">
				{/* Add Jumbotron here */}
				{/* License plates go here */}
				<h1>
					Hello {name}
				</h1>
			</main>
		</div>
	);
};
