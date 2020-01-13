import { LOGIN_USER, USER_LOADED, LOGOUT_USER, REGISTER_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alerts";
export const registerUser = data => async dispatch => {
	try {
		await axios.post("/user/register", data);
		dispatch({ type: REGISTER_USER });
		dispatch(setAlert("User Created", "success"));
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors && errors.length) {
			errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
		}

		console.error(errors);
	}
};
export const loginUser = (name, password) => async dispatch => {
	try {
		const res = await axios.post("/user/login", { name, password });
		dispatch({
			type: LOGIN_USER,
			payload: res.data
		});
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors && errors.length) {
			errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
		}

		console.log(errors);
	}
};

export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get("/user");
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors && errors.length) {
			errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
		}
	}
};

export const logout = () => dispatch => {
	dispatch({ type: LOGOUT_USER });
};
