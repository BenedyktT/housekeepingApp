import { LOGIN_USER, USER_LOADED } from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	loading: true,
	user: null
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_USER:
			localStorage.setItem("token", payload);
			return {
				...state,
				token: payload,
				isAuthenticated: true,
				loading: false
			};
		case USER_LOADED:
			return {
				...state,
				user: payload
			};

		default:
			return state;
	}
};
