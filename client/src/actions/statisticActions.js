import { GET_STATISTIC } from "./types";
import axios from "axios";
import moment from "moment";

const today = moment().format("YYYY-MM-DD");
const tommorow = moment()
	.add(1, "days")
	.format("YYYY-MM-DD");
export const getStatistic = ({ c, n }, outoforder) => async dispatch => {
	try {
		if (c && n) {
			const response = await axios.get(`/availability/${c}/${n}`);
			dispatch({
				type: GET_STATISTIC,
				payload: [...response.data, { room: "OOO", occupancy: outoforder }]
			});
		}
	} catch (error) {
		console.error(error.message);
	}
};
