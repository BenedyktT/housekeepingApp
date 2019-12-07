import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
	getRooms,
	getOccupancy,
	getRoomSetup
} from "../../actions/roomsActions";

const Rooms = ({
	getRooms,
	getOccupancy,
	occupancy,
	cleanStatus,
	getRoomSetup
}) => {
	useEffect(() => {
		getRoomSetup();
	}, []);
	if (occupancy && cleanStatus) {
		console.log(occupancy);
	}
	return <div></div>;
};

export default connect(
	state => ({
		occupancy: state.roomReducer.occupancy,
		cleanStatus: state.roomReducer.roomstatus
	}),
	{ getRooms, getOccupancy, getRoomSetup }
)(Rooms);
