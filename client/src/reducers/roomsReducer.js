import { GET_OCCUPANCY, GET_STATUS, GET_ROOM_SETUP } from "../actions/types";

const initialState = {
  roomSetup: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ROOM_SETUP:
      const { cleanStatus } = payload;
      const { currentRooms, nextRooms } = payload.roomStatus;

      //merge object from two requests (same key)
      const currentRoomSetup = currentRooms.map(occupancyRoom => {
        const { Room } = occupancyRoom;
        return Object.assign(
          ...cleanStatus.filter(el => el.Room === Room),
          occupancyRoom
        );
      });

      //merge object previous object with next day roomstatus report
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

      const co = "CHECKED_OUT";
      const na = "N_A";
      const avail = "AVAILABLE";
      const arr = "ARRIVED";
      const block = "BLOCKED";

      const test = roomSetup.map(
        ({ Room, Status, roomState: c, nextRooms: n }) => {
          let vacancy;
          let roomStatus;

          if (Status === "C") {
            Status = "Clean";
          }
          if (Status === "U") {
            Status = "Not Clean";
          }
          if (c === co || n === co) {
            c = "Checked Out";
            vacancy = "Vacant";
            roomStatus = "Departure";
          }
          if (c == arr && n === arr) {
            vacancy = "Stayover";
            roomStatus = "Stayover";
          }
          if (c === arr || n === arr) vacancy = "Occupied";
          if (c === avail && n === avail) {
            vacancy = "Vacant";
            roomStatus = "Available";
          }
          if (c === na && n === na) {
            vacancy = "Vacant";
          }
          if (c === na && n === arr)
            return {
              Room,
              Status,
              vacancy,
              roomStatus
            };
        }
      );
      console.log(test);

      return { ...state, roomSetup };

    default:
      return state;
  }
};
