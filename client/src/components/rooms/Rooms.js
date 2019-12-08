import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadRooms } from "../../actions/roomsActions";

const Rooms = ({ rooms, loadRooms }) => {
  useEffect(() => {
    loadRooms();
  }, []);
  const render = () => {
    return rooms.map(
      ({
        Room: number,
        Status: status,
        roomState: currentState,
        nextRooms: nextState
      }) => {
        return (
          <div key={number} className="room">
            <div className="room__col--left">
              <h4 className="bold">Room {number}</h4>
            </div>
            <span className="hor-line"></span>
            <div className="room__col--right">
              <p className="occupancy small">vacant</p>
              <p className="reservation">{currentState}</p>
              <p className="clean small">{status}</p>
              <p className="note small"></p>
            </div>
          </div>
        );
      }
    );
  };
  return (
    <div className="container">{rooms.length ? render() : "...Loading"}</div>
  );
  /* return <div>loading</div>; */
};

export default connect(
  state => ({
    rooms: state.roomReducer.roomSetup
  }),
  { loadRooms }
)(Rooms);
