import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRooms, getOccupancy } from "../../actions/roomsActions";

const Rooms = ({ getRooms, getOccupancy }) => {
  useEffect(() => {
    getOccupancy();
    getRooms();
  }, []);

  return <div></div>;
};

export default connect(null, { getRooms, getOccupancy })(Rooms);
