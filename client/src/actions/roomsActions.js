import { GET_ROOM_SETUP } from "./types";
import axios from "axios";
import moment from "moment";

const getRooms = (async () => {
	try {
		const rooms = await axios.get("/cleanstatus");
		return rooms.data;
	} catch (error) {
		console.error(error.response.data.msg);
	}
})();

const getOccupancy = (async () => {
	const yesterday = moment()
		.subtract(1, "days")
		.format("YYYY-MM-DD");
	const today = moment().format("YYYY-MM-DD");
	try {
		const currentRooms = await axios.get(`/reservation/${yesterday}`);
		const nextRooms = await axios.get(`/reservation/${today}`);
		return { currentRooms: currentRooms.data, nextRooms: nextRooms.data };
	} catch (error) {
		console.error(error.response.data.msg);
	}
})();

export const loadRooms = () => async dispatch => {
	const cleanStatus = await getRooms;
	const roomStatus = await getOccupancy;

	dispatch({
		type: GET_ROOM_SETUP,
		payload: { cleanStatus, roomStatus }
	});
};
