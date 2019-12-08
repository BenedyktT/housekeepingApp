import { GET_OCCUPANCY, GET_STATUS, GET_ROOM_SETUP } from "../actions/types";

const initialState = {
	roomSetup: []
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_STATUS:
			console.log("getstatus dispatched");
			return {
				...state,
				partialReports: { ...state.partialReports, cleanStatus: payload }
			};
		case GET_OCCUPANCY:
			console.log("get occupancy dispatched");
			return {
				...state,
				partialReports: {
					...state.partialReports,
					currentRooms: payload.currentRooms,
					nextRooms: payload.nextRooms
				}
			};
		case GET_ROOM_SETUP:
			const { cleanStatus } = payload;
			const { currentRooms, nextRooms } = payload.roomStatus;
			const currentRoomSetup = currentRooms.map(occupancyRoom => {
				const { Room } = occupancyRoom;
				return Object.assign(
					...cleanStatus.filter(el => el.Room === Room),
					occupancyRoom
				);
			});
			const roomSetup = currentRoomSetup.map(currentRoom => {
				const { Room } = currentRoom;
				const nextRoomsArr = nextRooms.map(room => ({
					Room: room.Room,
					nextRooms: room.roomState
				}));
				return Object.assign(
					currentRoom,
					...nextRoomsArr.filter(el => el.Room === Room)
				);
			});

			return { ...state, roomSetup };

		default:
			return state;
	}
};
