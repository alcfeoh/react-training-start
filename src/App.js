import React from 'react';
import './App.css';

class App extends React.Component {
	
	constructor() {
		super();
		this.name = 'React';
	}

	render() {
		return (
			<div className="App">
			<header className="App-header">
			</header>
				{/* Add Navigation here */}
				<main role="main">
				{/* Add Jumbotron here */}
				{/* License plates go here */}
				<h1>
				Hello {this.name}
				</h1>
				</main>
			</div>
		);
	}
};

export default App;
