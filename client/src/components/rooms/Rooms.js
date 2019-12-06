import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRooms, getOccupancy } from "../../actions/roomsActions";

const Rooms = ({ getRooms, getOccupancy, occupancy, cleanStatus }) => {
  useEffect(() => {
    /*     getOccupancy();
    getRooms(); */
  }, []);

  return <div></div>;
};

export default connect(
  state => ({
    occupancy: state.roomReducer.occupancyStatus,
    cleanStatus: state.roomReducer.cleanStatus
  }),
  { getRooms, getOccupancy }
)(Rooms);
