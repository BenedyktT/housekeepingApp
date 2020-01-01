import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser, loadUser } from "../actions/authAction";
const Landing = ({ loginUser, isAuthenticated, loadUser }) => {
	const [inputValue, setInputValue] = useState({ name: null, password: null });

	const onSubmit = async e => {
		const { name, password } = inputValue;
		e.preventDefault();
		if (!name || !password) {
			console.log("dispatch error");
			return;
		}
		loginUser(name, password);
	};
	const onChange = e => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	};
	if (isAuthenticated) {
		loadUser();
		return <Redirect to="/report" />;
	}
	return (
		<div className="container border ">
			<form onSubmit={onSubmit} className="form">
				<div className="input-container">
					<label htmlFor="name">Name:</label>
					<input
						onChange={onChange}
						className="padding-small  margin-small-x "
						name="name"
						type="text"
					/>
				</div>

				<div className="input-container">
					<label htmlFor="password">Password:</label>
					<input
						onChange={onChange}
						className="padding-small  margin-small-x "
						name="password"
						type="password"
					/>
				</div>

				<input className="padding-small margin-y" type="submit" value="Login" />
			</form>
		</div>
	);
};
export default connect(
	state => ({ isAuthenticated: state.authReducer.isAuthenticated }),
	{ loginUser, loadUser }
)(Landing);
