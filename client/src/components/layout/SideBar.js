import React, { Fragment } from "react";
import { connect } from "react-redux";
import { toggleNavbar } from "../../actions/layoutAction";
import classnames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isNavbarOpen, toggleNavbar }) => {
  return (
    <Fragment>
      <div
        onClick={() => {
          toggleNavbar();
        }}
        className={classnames("sidebar__overlay", { active: isNavbarOpen })}
      ></div>
      <div className={classnames("sidebar", { active: isNavbarOpen })}>
        <ul>
          <li className="sidebar__link">
            <Link className="text-white" to="/report" onClick={toggleNavbar}>
              Report
            </Link>
          </li>
          <li className="sidebar__link">
            <Link className="text-white" to="/settings" onClick={toggleNavbar}>
              Settings
            </Link>
          </li>
          <li className="sidebar__link">
            <Link onClick={toggleNavbar} className="text-white" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default connect(
  state => ({ isNavbarOpen: state.layoutReducer.isNavbarOpen }),
  { toggleNavbar }
)(SideBar);
