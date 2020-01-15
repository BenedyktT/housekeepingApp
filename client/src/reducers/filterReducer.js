import {
	SHOW_UNCLEAN,
	SHOW_ALL,
	SELECT_HALLWAY,
	GET_CURRENT_CALENDAR_VALUE
} from "../actions/types";

const initialState = {
	filterCleanRoomsMethod: SHOW_ALL,
	setVisibleHallway: "all",
	getCurrentCalendarValue: {}
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SHOW_UNCLEAN:
			return { ...state, filterCleanRoomsMethod: SHOW_UNCLEAN };
		case SHOW_ALL:
			return { ...state, filterCleanRoomsMethod: SHOW_ALL };
		case SELECT_HALLWAY:
			return { ...state, setVisibleHallway: payload };
		case GET_CURRENT_CALENDAR_VALUE:
			return {
				...state,
				getCurrentCalendarValue: payload
			};
		default:
			return state;
	}
};
