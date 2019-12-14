import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
  showUnclean,
  showAll,
  selectHallway
} from "../../actions/filterAction";
import Calendar from "react-calendar";

const FiltersBar = ({ showAll, showUnclean, selectHallway }) => {
  const [isCalendarVisible, toggleCalendarVisible] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());

  useEffect(() => {
    const date = moment(calendarValue).format("YYYY-DD-MM");
    console.log(date);
  }, [calendarValue]);

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
          <i className="cal-controls sm-text-05 fas fa-chevron-left"></i>
          <button
            onClick={() => toggleCalendarVisible(!isCalendarVisible)}
            className="margin-small-x"
          >
            15 Dec
          </button>
          <i className="cal-controls sm-text-05 fas fa-chevron-right"></i>
        </div>
      </div>
      {isCalendarVisible && (
        <div className="calendar">
          <Calendar onChange={setCalendarValue} value={calendarValue} />
        </div>
      )}
    </div>
  );
};

export default connect(null, { showAll, showUnclean, selectHallway })(
  FiltersBar
);

/* 
  <button
          onClick={() => {
            toggleHamburgerActive(!isHamburgerActive);
          }}
		></button>
		 */
