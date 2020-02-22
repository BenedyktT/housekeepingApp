import React, { useEffect, createRef } from "react";
import { connect } from "react-redux";
import { getStatistic } from "../../actions/statisticActions";
import moment from "moment";
import { Fragment } from "react";

const Overview = ({ getStatistic, calendarDate, rooms, totalRooms }) => {
	useEffect(() => {
		const outOfOrder = rooms.filter(e => e.vacancy === "Out of Order").length;
		if (calendarDate && !moment(calendarDate.n).isSame(moment(), "day")) {
			getStatistic(calendarDate, outOfOrder);
		}
	}, [calendarDate]);
	const render = () => {
		const day = moment(calendarDate.n);
		if (day.isAfter(moment(), "day")) {
			return (
				<div className="overview container">
					<span>
						Total: <i className="bold">{totalRooms} </i>
						rooms
					</span>
				</div>
			);
		}
		if (day.isSame(moment(), "day")) {
			const roomsToClean = rooms.reduce(
				(acc, curr) => {
					if (curr.cleanStatus === "Not Clean") {
						acc.toClean++;
					}
					if (curr.vacancy === "Occupied") {
						acc.isNotCheckedout++;
					}
					if (curr.vacancy === "Stayover") {
						acc.stayovers++;
					}
					return acc;
				},
				{ toClean: 0, stayovers: 0, isNotCheckedout: 0 }
			);
			const { toClean, stayovers, isNotCheckedout } = roomsToClean;
			return (
				<div className="overview container">
					<span>To Clean: {toClean}</span>
					<span>Stayovers: {stayovers}</span>
					<span>Has not left: {isNotCheckedout}</span>
				</div>
			);
		}
		if (day.isBefore(moment(), "day")) {
			return null;
		}
	};
	return <Fragment>{render()}</Fragment>;
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
