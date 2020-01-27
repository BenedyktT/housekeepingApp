import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStatistic } from "../../actions/statisticActions";
import moment from "moment";

const Overview = ({ getStatistic, calendarDate, rooms, loading }) => {
	useEffect(() => {
		if (calendarDate) {
			getStatistic(calendarDate, rooms);
		}
	}, [calendarDate]);
	return (
		<div className="overview container">
			<span>
				Total: <i className="bold">25 </i>rooms
			</span>
			<span>
				Unclean: <i className="bold">25 </i>
			</span>
			<span>
				Stayovers: <i className="bold">25 </i>
			</span>
		</div>
	);
};

export default connect(
	state => ({
		calendarDate: state.filterReducer.getCurrentCalendarValue,
		rooms: state.roomReducer.roomsReport.filter(
			e => e.vacancy === "Out of Order"
		).length,
		loading: state.roomReducer.loading
	}),
	{ getStatistic }
)(Overview);
