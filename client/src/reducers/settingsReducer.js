import { SET_LANGUAGE } from "../actions/types";
const initialState = {
	language: localStorage.getItem("language") || "en"
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_LANGUAGE:
			localStorage.setItem("language", payload);
			return { ...state, language: payload };

		default:
			return state;
	}
};
