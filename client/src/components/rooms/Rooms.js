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
				let desc;
				if (
					(currentState === "ARRIVED" && nextState === "ARRIVED") ||
					(currentState === "CHECKED_OUT" && nextState === "ARRIVED")
				) {
					desc = "Stayover";
				}
				if (currentState === "AVAILABLE" && nextState === "NOT_ARRIVED") {
					desc = "Arriving";
				}
				if (
					(currentState === "CHECKED_OUT" ||
						currentState === "ARRIVED" ||
						currentState === "N_A") &&
					nextState === "NOT_ARRIVED"
				) {
					desc = "Departure&Arriving";
				}
				if (
					(currentState === "CHECKED_OUT" || currentState === "ARRIVED") &&
					nextState === "AVAILABLE"
				) {
					desc = "Departure";
				}
				if (currentState === "CHECKED_OUT" && nextState === "CHECKED_OUT") {
					desc = "Checked out earlier";
				}
				if (
					(currentState === "AVAILABLE" || currentState === "N_A") &&
					(nextState === "AVAILABLE" || nextState === "N_A")
				) {
					desc = "Clean";
				}
				if (currentState === "BLOCKED" || currentState === "BLOCKED") {
					desc = "Out of order";
				}

				return (
					<div key={number} className="room">
						<p>Number: {number}</p>
						<p className={desc}>Now: {desc}</p>
						<p>Status: {status}</p>
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
