import { GET_OCCUPANCY, GET_STATUS } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STATUS:
      return { ...state, roomstatus: [...payload] };
    case GET_OCCUPANCY:
      /*      const result = state.roomstatus.map(roomStatus =>
        Object.assign(
          {},
          roomStatus,
          payload.find(cleanRoom => cleanRoom.room === roomStatus.room) || {}
        )
      ); */
      console.log(payload);
      return { ...state };
    default:
      return state;
  }
};
