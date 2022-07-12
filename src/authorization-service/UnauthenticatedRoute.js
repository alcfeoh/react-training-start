import React from "react";
import { Route, Redirect } from "react-router-dom";

export class UnauthenticatedRoute extends React.Component {

	constructor(props) {
		super(props);
		// See App.js to see what to expect here.
		// For UnauthenticatedRoute, props is {path: "/login", "location":{"pathname":"/login","search":"?redirect=/checkout"...
		// and "children" (the child component, CheckoutView)
	}
	render() {
		let { children, ...rest } = this.props;
		let { location } = rest;
		let { search } = location;
		let isAuthenticated = children?.props?.isAuthenticated;
		if (search) {
			search = search.replace("?redirect=/", "");
		}
		return (
			<Route {...rest}>
				{!isAuthenticated ? children : ( <Redirect to={"/" + search} /> )}
			</Route>
		);
	}
}