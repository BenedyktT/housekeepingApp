import { SHOW_UNCLEAN, SHOW_ALL } from "../actions/types";

const initialState = {
	filterRooms: "SHOW_UNCLEAN"
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SHOW_UNCLEAN:
			return { ...state, filterRooms: "SHOW_UNCLEAN" };
		case SHOW_ALL:
			return { ...state, filterRooms: "SHOW_ALL" };
		default:
			return state;
	}
};
