import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { loadRooms } from "../../actions/roomsActions";
import visibleRooms from "../../selectors/visibleRooms";
import classnames from "classnames";

const Rooms = ({ rooms, loadRooms, setReportDate }) => {
	const initLoadRooms = useCallback(
		report => {
			loadRooms(report);
		},
		[loadRooms]
	);
	useEffect(() => {
		initLoadRooms(setReportDate);
	}, [initLoadRooms]);
	const render = () => {
		return rooms.map(({ number, cleanStatus, vacancy, roomStatus }) => {
			return (
				<div
					key={number}
					className={classnames(
						"room",
						{
							"gradient-blue": vacancy === "Vacant" || vacancy === "Clean"
						},
						{ "gradient-pink": vacancy === "Occupied" },
						{ "gradient-green": vacancy === "Stayover" },
						{ "gradient-dark": vacancy === "Out of Order" }
					)}
				>
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
		rooms: visibleRooms(state.roomReducer.roomsReport, state.filterReducer),
		setReportDate: state.filterReducer.getCurrentCalendarValue
	}),
	{ loadRooms }
)(Rooms);
