import {
	GET_ROOM_SETUP,
	GET_CLEAN_ROOMS,
	LOAD_ROOMS,
	DESTROY_REPORT
} from "../actions/types";

const initialState = {
	roomsReport: [],
	loading: null
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOAD_ROOMS:
			return { ...state, loading: true };
		case GET_ROOM_SETUP:
			const { cleanStatus, roomNote } = payload;
			const { currentRooms, nextRooms } = payload.roomStatus;

			//merge object from two requests (same key)

			const currentRoomSetup = currentRooms
				.filter((e, index, array) => {
					const prevItem = array[index - 1];
					const nextItem = array[index + 1];
					if (
						(nextItem && e.Room === nextItem.Room) ||
						(prevItem && e.Room === prevItem.Room)
					) {
						return e.Room !== "VEIT" && e.roomState !== "N_A";
					} else return e.Room !== "VEIT";
				})
				.map(occupancyRoom => {
					const { Room } = occupancyRoom;
					return Object.assign(
						...cleanStatus.filter(el => el.Room === Room),
						occupancyRoom
					);
				});

			//merge previous object with next day roomstatus report object
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

			const noshow = "NO_SHOW";
			const vac = "VACANT";
			const occ = "OCCUPIED";
			const co = "CHECKED_OUT";
			const na = "N_A";
			const avail = "AVAILABLE";
			const arr = "ARRIVED";
			const block = "BLOCKED";
			const narr = "NOT_ARRIVED";
			let roomsReport = roomSetup.map(
				({ Room: number, Status: cleanStatus, roomState: c, nextRooms: n }) => {
					let vacancy;
					let roomStatus;

					if (cleanStatus === "C") {
						cleanStatus = "Clean";
					}
					if (cleanStatus === "U") {
						cleanStatus = "Not Clean";
					}

					if (
						(c === narr ||
							c === avail ||
							c === na ||
							c === block ||
							c === noshow) &&
						(n === narr ||
							n === avail ||
							n === na ||
							n === co ||
							n === block ||
							n === vac)
					) {
						vacancy = cleanStatus;
						roomStatus = cleanStatus;
					}
					if ((c === narr || c === avail || c === block) && n === arr) {
						vacancy = "Occupied";
						roomStatus = "Arriving";
					}

					if (
						(c === block || c === na || c === avail || c === noshow) &&
						n === narr
					) {
						vacancy = "Vacant";
						roomStatus = "Arriving";
					}
					if (c === co && n === narr) {
						vacancy = "Vacant";
						roomStatus = "Departure+Arriving";
					}
					if ((c === arr || c === na) && n === arr) {
						vacancy = "Stayover";
						roomStatus = "Stayover";
					}
					if (c === co && n === arr) {
						vacancy = "Vacant";
						roomStatus = "Departure+Arriving";
					}
					if (c === arr && n === narr) {
						vacancy = "Occupied";
						roomStatus = "Departure+Arriving";
					}
					if (
						(c === co || c === block || c === narr) &&
						(n === avail || n === co || n === na)
					) {
						vacancy = "Vacant";
						roomStatus = "Departure";
					}
					if (c === arr && (n === block || n === na || n === avail)) {
						vacancy = "Occupied";
						roomStatus = "Departure";
					}

					if ((c === narr || c === avail || c === block) && n === block) {
						vacancy = "Out of Order";
						roomStatus = "Out of Order";
					}
					if (c === co && n === block) {
						vacancy = "Vacant";
						roomStatus = "Departure";
					}
					if (c === vac) {
						vacancy = "Vacant";
						roomStatus = cleanStatus;
					}
					if (c === occ) {
						vacancy = "Occupied";
						roomStatus = cleanStatus;
					}
					if (c === arr && n === occ) {
						vacancy = "Occupied";
						roomStatus = cleanStatus;
					}

					return {
						number,
						cleanStatus,
						vacancy,
						roomStatus
					};
				}
			);
			roomsReport = roomsReport.map(room => {
				const { number } = room;
				return Object.assign(
					...roomNote.filter(el => {
						if (el.roomNote) {
							return el.number === number;
						} else {
							return null;
						}
					}),
					room
				);
			});

			return { ...state, roomsReport, loading: false };

		case GET_CLEAN_ROOMS:
			const newState = state.roomsReport
				.filter(e => {
					return payload.map(cleanRooms => {
						if (cleanRooms.number !== parseInt(e.number)) return null;
						if (cleanRooms.isDnd) {
							e.cleanStatus = "Do not disturb";
							e.vacancy = "Do not disturb";
							e.cleanedBy = cleanRooms.username;
							return null;
						}
						e.cleanStatus = "Clean";
						e.cleanedBy = cleanRooms.username;
						return null;
					});
				})
				.sort((a, b) => {
					if (parseInt(a.number) > parseInt(b.number)) {
						return 1;
					} else return -1;
				});

			return { ...state, roomsReport: [...newState], loading: false };
		case DESTROY_REPORT:
			return {
				roomsReport: [],
				loading: true
			};
		default:
			return state;
	}
};
