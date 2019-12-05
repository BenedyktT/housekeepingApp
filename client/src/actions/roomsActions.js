import { GET_OCCUPANCY, GET_STATUS } from "./types";
import axios from "axios";

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
  const rooms = await axios.get("/reservation");
  try {
    dispatch({
      type: GET_OCCUPANCY,
      payload: rooms.data
    });
  } catch (error) {
    console.error(error.response.data.msg);
  }
};
