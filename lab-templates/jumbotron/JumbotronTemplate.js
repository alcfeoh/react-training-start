import React, { Fragment } from 'react';

class JumbotronTemplate extends React.Component {
	render() {
		return (
			<Fragment>
			<div className="jumbotron">
				<div className="container">
					<h1 className="display-3">Title</h1>
					<p>Description</p>
				</div>
			</div>
			</Fragment>
		);
	}
};
	
export default JumbotronTemplate;