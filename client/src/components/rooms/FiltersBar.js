import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
	showUnclean,
	showAll,
	selectHallway,
	getCurrentCalendarValue
} from "../../actions/filterAction";
import { loadRooms } from "../../actions/roomsActions";
import Calendar from "react-calendar";

const FiltersBar = ({
	showAll,
	showUnclean,
	selectHallway,
	getCurrentCalendarValue,
	loadRooms
}) => {
	const [isCalendarVisible, toggleCalendarVisible] = useState(false);
	const [calendarValue, setCalendarValue] = useState(new Date());
	const didMount = useRef(false);
	useEffect(() => {
		const dates = {
			c: moment(calendarValue)
				.subtract("1", "days")
				.format("YYYY-MM-DD"),
			n: moment(calendarValue).format("YYYY-MM-DD")
		};
		getCurrentCalendarValue(dates);
		if (didMount.current) {
			loadRooms(dates);
		} else {
			didMount.current = true;
		}
	}, [calendarValue, getCurrentCalendarValue, loadRooms]);

	return (
		<div className="container ">
			<div className=" rounded shadow filter-bar">
				<select
					defaultValue="all"
					onChange={e => {
						e.target.value === "all" ? showAll() : showUnclean();
					}}
					className="sm-text-1"
					name="filterOptions"
				>
					<option value="all">Show all</option>
					<option value="unclean">Show unclean</option>
				</select>
				<select
					defaultValue="unclean"
					onChange={e => {
						selectHallway(e.target.value);
					}}
					className="sm-text-1"
					name="filterOptions"
				>
					<option value="all">All</option>
					<option value="100">100</option>
					<option value="200">200 ground</option>
					<option value="213">200 upper</option>
					<option value="300">300 ground</option>
					<option value="313">300 upper</option>
				</select>
				<div className="to-right mr-1 sm-text-1">
					<button
						onClick={() => {
							setCalendarValue(
								moment(calendarValue)
									.subtract(1, "days")
									.toDate()
							);
						}}
					>
						<i className="cal-controls sm-text-05 fas fa-chevron-left"></i>
					</button>

					<button
						onClick={() => toggleCalendarVisible(!isCalendarVisible)}
						className="margin-small-x"
					>
						{moment(calendarValue).format("DD MMM")}
					</button>
					<button
						onClick={() => {
							setCalendarValue(
								moment(calendarValue)
									.add(1, "days")
									.toDate()
							);
						}}
					>
						<i className="cal-controls sm-text-05 fas fa-chevron-right"></i>
					</button>
				</div>
			</div>
			{isCalendarVisible && (
				<div className="calendar">
					<Calendar
						onChange={date => {
							setCalendarValue(date);
							toggleCalendarVisible(false);
						}}
						value={calendarValue}
					/>
				</div>
			)}
		</div>
	);
};

export default connect(null, {
	showAll,
	showUnclean,
	selectHallway,
	getCurrentCalendarValue,
	loadRooms
})(FiltersBar);

/* 
  <button
          onClick={() => {
            toggleHamburgerActive(!isHamburgerActive);
          }}
		></button>
		 */
