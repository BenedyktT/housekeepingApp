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
import { SHOW_ALL, SHOW_UNCLEAN } from "../../actions/types";
import Calendar from "react-calendar";
import left from "../../img/left.svg";
import right from "../../img/right.svg";

const FiltersBar = ({
	showAll,
	showUnclean,
	selectHallway,
	getCurrentCalendarValue,
	loadRooms,
	language,
	visibleHallway,
	filterCleanRoomsMethod
}) => {
	const pl = {
		show_all: "Pokaz wszystkie",
		show_unclean: "Pokaz brudne",
		all: "Wszystkie",
		100: "100",
		200: "201-212",
		213: "213-224",
		300: "301-312",
		313: "313-324"
	};
	const en = {
		show_all: "Show All",
		show_unclean: "Show unclean",
		all: "all",
		100: "100",
		200: "201-212",
		213: "213-224",
		300: "301-312",
		313: "313-324"
	};
	const t = text => {
		let key;
		if (text) {
			key = text.replace(/ |\+/g, "_").toLowerCase();
		}
		if (language === "pl") {
			return pl[key];
		}
		if (language === "en") {
			return en[key];
		}
	};
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
					defaultValue={filterCleanRoomsMethod}
					onChange={e => {
						e.target.value === SHOW_ALL ? showAll() : showUnclean();
					}}
					className="sm-text-1"
					name="filterOptions"
				>
					<option value={SHOW_ALL}>{t("Show all")}</option>
					<option value={SHOW_UNCLEAN}>{t("Show unclean")}</option>
				</select>
				<select
					defaultValue={visibleHallway}
					onChange={e => {
						selectHallway(e.target.value);
					}}
					className="sm-text-1"
					name="filterOptions"
				>
					<option value="all">{t("All")}</option>
					<option value="100">{t("100")}</option>
					<option value="200">{t("200")}</option>
					<option value="213">{t("213")}</option>
					<option value="300">{t("300")}</option>
					<option value="313">{t("313")}</option>
				</select>
				<div className="to-right sm-text-1">
					<button
						className="no-border"
						onClick={() => {
							setCalendarValue(
								moment(calendarValue)
									.subtract(1, "days")
									.toDate()
							);
						}}
					>
						<img
							src={left}
							alt="previous"
							className="cal-controls sm-text-05 "
						/>
					</button>

					<button
						onClick={() => toggleCalendarVisible(!isCalendarVisible)}
						className="margin-small-x"
					>
						{moment(calendarValue).format("DD MMM")}
					</button>
					<button
						className="no-border"
						onClick={() => {
							setCalendarValue(
								moment(calendarValue)
									.add(1, "days")
									.toDate()
							);
						}}
					>
						<img src={right} alt="next" className="cal-controls sm-text-05 " />{" "}
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

export default connect(
	state => ({
		language: state.settingsReducer.language,
		visibleHallway: state.filterReducer.setVisibleHallway,
		filterCleanRoomsMethod: state.filterReducer.filterCleanRoomsMethod
	}),
	{
		showAll,
		showUnclean,
		selectHallway,
		getCurrentCalendarValue,
		loadRooms
	}
)(FiltersBar);

/* 
  <button
          onClick={() => {
            toggleHamburgerActive(!isHamburgerActive);
          }}
		></button>
		 */
