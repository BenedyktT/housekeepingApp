import { GET_ROOM_SETUP } from "../actions/types";

const initialState = {
  roomsReport: []
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
      const narr = "NOT_ARRIVED";
      console.log(roomSetup);
      const roomsReport = roomSetup.map(
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
            (c === narr && n === narr) ||
            (c === narr && n === avail) ||
            (c === narr && n === na) ||
            (c === avail && n === avail) ||
            (c === avail && n === co) ||
            (c === avail && n === na) ||
            (c === block && n === avail) ||
            (c === block && n === na) ||
            (c === na && (n === avail || n === co || n === block || n === na))
          ) {
            vacancy = cleanStatus;
            roomStatus = cleanStatus;
          }
          if (
            (c === narr && n === arr) ||
            (c === avail && n === (narr || arr)) ||
            ((c === block || c === arr || c === na || c === avail) && n === arr)
          ) {
            vacancy = "Occupied";
            roomStatus = "Arriving";
          }
          if ((c === block || c === na) && n === narr) {
            vacancy = "Vacant";
            roomStatus = "Arriving";
          }
          if (c === co && n === narr) {
            vacancy = "Vacant";
            roomStatus = "Departure+Arriving";
          }
          if (c === arr && (n === narr || n === arr)) {
            vacancy = "Stayover";
            roomStatus = "Occupied";
          }
          if (c === co && n === arr) {
            vacancy = "Vacant";
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
          if (c)
            return {
              number,
              cleanStatus,
              vacancy,
              roomStatus
            };
        }
      );

      return { ...state, roomsReport };

    default:
      return state;
  }
};
