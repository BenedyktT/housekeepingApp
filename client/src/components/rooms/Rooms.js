import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { loadRooms } from "../../actions/roomsActions";
import visibleRooms from "../../selectors/visibleRooms";

const Rooms = ({ rooms, loadRooms }) => {
  const initLoadRooms = useCallback(() => {
    loadRooms();
  }, [loadRooms]);
  useEffect(() => {
    initLoadRooms();
  }, [initLoadRooms]);
  const render = () => {
    return rooms.map(({ number, cleanStatus, vacancy, roomStatus }) => {
      return (
        <div key={number} className="room">
          <div className="room__col--left">
            <h4 className="bold">Room {number}</h4>
          </div>
          <span className="hor-line"></span>
          <div className="room__col--right">
            <p className="occupancy small">{vacancy}</p>
            <p className="reservation">{roomStatus}</p>
            <p
              className={
                cleanStatus === "Clean"
                  ? "success clean small"
                  : "danger clean small"
              }
            >
              {cleanStatus}
            </p>
            <p className="note small"></p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container">{rooms.length ? render() : "...Loading"}</div>
  );
  /* return <div>loading</div>; */
};

export default connect(
  state => ({
    rooms: visibleRooms(state.roomReducer.roomsReport, state.filterReducer)
  }),
  { loadRooms }
)(Rooms);
