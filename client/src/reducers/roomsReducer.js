import { GET_OCCUPANCY, GET_STATUS, GET_ROOM_SETUP } from "../actions/types";

const initialState = {
	roomSetup: []
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_STATUS:
			return { ...state, roomstatus: payload };
		case GET_OCCUPANCY:
			return { ...state, occupancy: payload };
		case GET_ROOM_SETUP:
			console.log(payload);
			return {
				...state,
				roomSetup: [...state.roomSetup, ...payload]
			};
		default:
			return state;
	}
};
