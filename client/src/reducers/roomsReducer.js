import { GET_OCCUPANCY, GET_STATUS } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STATUS:
      if (state.length) {
        const test = state.map(room => {
          room.filter(e => e.roomName === payload.Room);
        });
      }

      return state;
    case GET_OCCUPANCY:
      return { ...state, ...payload };
    default:
      return state;
  }
};
