import { GET_ROOM_SETUP, GET_CLEAN_ROOMS } from "./types";
import axios from "axios";
import moment from "moment";
import { setAlert } from "./alerts";

const getRooms = (async () => {
  try {
    const rooms = await axios.get("/cleanstatus");
    return rooms.data;
  } catch (error) {
    console.error(error.response.data.msg);
  }
})();

const yesterday = moment()
  .subtract(1, "days")
  .format("YYYY-MM-DD");
const today = moment().format("YYYY-MM-DD");
const getOccupancy = async ({ c = yesterday, n = today }) => {
  try {
    const currentRooms = await axios.get(`/reservation/${c}`);
    const nextRooms = await axios.get(`/reservation/${n}`);
    return { currentRooms: currentRooms.data, nextRooms: nextRooms.data };
  } catch (error) {
    console.error(error.response.data.msg);
  }
};

const getRoomnotes = async () => {
  try {
    const roomNotes = await axios.get("/roomsetup");
    return roomNotes.data;
  } catch (error) {
    console.error(error);
  }
};

export const loadRooms = date => async dispatch => {
  const cleanStatus = await getRooms;
  const roomStatus = await getOccupancy(date);
  const roomNote = await getRoomnotes();

  dispatch({
    type: GET_ROOM_SETUP,
    payload: { cleanStatus, roomStatus, roomNote }
  });
};

//get and set clean statuses

export const setClean = number => async dispatch => {
  try {
    await axios.post(`roomstatus/cleanrooms/${number}`);
    dispatch(getCleanRooms());
    dispatch(setAlert(`Room ${number} is cleaned`, "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors && errors.length) {
      errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
    }
  }
};

export const getCleanRooms = () => async dispatch => {
  try {
    const response = await axios.get(`roomstatus/cleanrooms/`);

    dispatch({
      type: GET_CLEAN_ROOMS,
      payload: response.data.map(({ createdAt, user, number }) => ({
        createdAt,
        username: user.name,
        number
      }))
    });
  } catch (error) {
    console.error(error);
  }
};
