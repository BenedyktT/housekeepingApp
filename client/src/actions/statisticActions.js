import { GET_STATISTIC } from "./types";
import axios from "axios";

export const getStatistic = ({ c, n }, outoforder) => async dispatch => {
  console.log("this dispatched");
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
