import { GET_STATISTIC } from "../actions/types";
const initialState = {
	totalRooms: null,
	standardRooms: null,
	economyRooms: null,
	superiorRooms: null,
	bungalows: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_STATISTIC:
			const totalRooms = payload.reduce((acc, curr) => {
				if (
					curr.room !== "OOO" ||
					(curr.room === "OOO" && curr.occupancy === 0)
				) {
					return acc + curr.occupancy;
				} else {
					return acc - curr.occupancy;
				}
			}, 0);

			return {
				...state,
				totalRooms,
				standardRooms: payload.filter(e => e.room === "DBL-S"),
				economyRooms: payload.filter(e => e.room === "ECO-S"),
				superiorRooms: payload.filter(e => e.room === "SUP-S"),
				bungalows: payload.filter(e => e.room === "BUN-S"),
				ooo: payload.filter(e => e.room === "OOO")
			};
		default:
			return state;
	}
};
