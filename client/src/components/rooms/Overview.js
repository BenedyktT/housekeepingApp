import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStatistic } from "../../actions/statisticActions";
import moment from "moment";
import { Fragment } from "react";

const Overview = ({
	getStatistic,
	calendarDate,
	rooms,
	loading,
	totalRooms
}) => {
	useEffect(() => {
		const outOfOrder = rooms.filter(e => e.vacancy === "Out of Order").length;
		if (calendarDate) {
			getStatistic(calendarDate, outOfOrder);
		}
	}, [calendarDate]);
	return (
		<Fragment>
			{!moment(calendarDate.n).isSameOrBefore(moment(), "day") && (
				<div className="overview container">
					<span>
						Total: <i className="bold">{totalRooms} </i>
						rooms
					</span>
				</div>
			)}
		</Fragment>
	);
};

export default connect(
	state => ({
		totalRooms: state.statisticReducer.totalRooms,
		calendarDate: state.filterReducer.getCurrentCalendarValue,
		rooms: state.roomReducer.roomsReport,
		loading: state.roomReducer.loading
	}),
	{ getStatistic }
)(Overview);
