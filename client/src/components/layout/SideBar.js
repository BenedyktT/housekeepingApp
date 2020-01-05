import React, { Fragment } from "react";
import { connect } from "react-redux";
import { toggleNavbar } from "../../actions/layoutAction";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authAction";

const SideBar = ({ isNavbarOpen, toggleNavbar, isAuthenticated, logout }) => {
  return (
    <Fragment>
      <div
        onClick={() => {
          toggleNavbar(false);
        }}
        className={classnames("sidebar__overlay", { active: isNavbarOpen })}
      ></div>
      <div className={classnames("sidebar", { active: isNavbarOpen })}>
        <ul>
          {isAuthenticated && (
            <Fragment>
              <li className="sidebar__link">
                <Link
                  className="hover link-hover--pink text-white text-big"
                  to="/report"
                  onClick={toggleNavbar}
                >
                  Report
                </Link>
              </li>
              <li className="sidebar__link">
                <Link
                  className="hover link-hover--pink text-white text-big"
                  to="/settings"
                  onClick={toggleNavbar}
                >
                  Settings
                </Link>
              </li>
            </Fragment>
          )}
          <li className="sidebar__link">
            <Link
              onClick={toggleNavbar}
              className="hover link-hover--pink text-white text-big"
              to="/about"
            >
              About
            </Link>
          </li>
          <li className="sidebar__link">
            {isAuthenticated ? (
              <Link
                className="hover link-hover--pink text-white text-big"
                to={"/"}
                onClick={() => {
                  logout();
                  toggleNavbar();
                }}
              >
                Log Out
              </Link>
            ) : (
              <Link
                className="hover link-hover--pink text-white text-big"
                to={"/login"}
                onClick={toggleNavbar}
              >
                Log in
              </Link>
            )}
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default connect(
  state => ({
    isNavbarOpen: state.layoutReducer.isNavbarOpen,
    isAuthenticated: state.authReducer.isAuthenticated
  }),
  { toggleNavbar, logout }
)(SideBar);
