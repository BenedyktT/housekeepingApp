import React, { useState } from "react";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import { Redirect } from "react-router-dom";

const Register = ({ setAlert, registerUser, history, isRegistered }) => {
	const [inputValue, setInputValue] = useState({ name: null, password: null });
	const onSubmit = async e => {
		const { name, password, repeatPassword } = inputValue;
		e.preventDefault();
		if (!name || !password) {
			setAlert("All fields are required", "danger");
			return;
		}
		if (password !== repeatPassword) {
			setAlert("Password fields has to be the same", "danger");
			return;
		}

		registerUser(inputValue);
	};
	if (isRegistered) {
		return <Redirect to="/" />;
	}
	const onChange = e => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	};
	return (
		<div className="container border nooverflow">
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
					<label htmlFor="email">Email:</label>
					<input
						onChange={onChange}
						className="padding-small  margin-small-x "
						name="email"
						type="email"
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
				<div className="input-container">
					<label htmlFor="repeatPassword">Repeat password:</label>
					<input
						onChange={onChange}
						className="padding-small  margin-small-x "
						name="repeatPassword"
						type="password"
					/>
				</div>

				<input className="padding-small margin-y" type="submit" value="Login" />
			</form>
		</div>
	);
};

export default connect(
	state => ({ isRegistered: state.authReducer.isRegistered }),
	{ setAlert, registerUser }
)(Register);
