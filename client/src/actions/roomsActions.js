import { GET_OCCUPANCY, GET_STATUS, GET_ROOM_SETUP } from "./types";
import axios from "axios";
import moment from "moment";

export const getRooms = () => async dispatch => {
	try {
		const rooms = await axios.get("/cleanstatus");

		dispatch({
			type: GET_STATUS,
			payload: rooms.data
		});
	} catch (error) {
		console.error(error.response.data.msg);
	}
};

export const getOccupancy = () => async dispatch => {
	const today = moment().format("YYYY-MM-DD");
	try {
		const rooms = await axios.get(`/reservation/${today}`);
		dispatch({
			type: GET_OCCUPANCY,
			payload: rooms.data
		});
	} catch (error) {
		console.error(error.response.data.msg);
	}
};

export const getRoomSetup = () => async dispatch => {
	const room = [
		101,
		102,
		103,
		104,
		105,
		106,
		107,
		108,
		109,
		110,
		111,
		112,
		113,
		114
	];
	try {
		room.map(async r => {
			try {
				const res = await axios.get(`/roomstatus/${r}`);
				return dispatch({
					type: GET_ROOM_SETUP,
					payload: res.data
				});
			} catch (err) {
				return console.error(err);
			}
		});
	} catch (error) {
		console.error(error);
	}
};
