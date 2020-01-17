import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Privateroute = ({
	component: Component,
	isAuthenticated,
	loading,
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			!isAuthenticated && !loading ? (
				<Redirect to="/login" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

export default connect(state => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading
}))(Privateroute);
