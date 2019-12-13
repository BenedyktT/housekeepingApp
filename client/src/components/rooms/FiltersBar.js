import React, { useState, useEffect } from "react";
import { ReactComponent as SortDown } from "../../img/sort-down-solid.svg";
import { connect } from "react-redux";
import {
  showUnclean,
  showAll,
  selectHallway
} from "../../actions/filterAction";

const FiltersBar = ({ showAll, showUnclean, selectHallway }) => {
  const [isHamburgerActive, toggleHamburgerActive] = useState(false);

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
          <option value="200">200</option>
        </select>
      </div>
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
