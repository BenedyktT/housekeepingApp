import React, { Fragment } from "react";
import avatar from "../../img/ayo-ogunseinde-THIs-cpyebg-unsplash.jpg";
import { connect } from "react-redux";

const Navbar = ({ isAuthenticated, user }) => {
  return (
    <nav className="nav">
      <div className="avatar">
        {isAuthenticated ? (
          <Fragment>
            <img src={avatar} alt="avatar" className="avatar__image" />
            <h3 className="avatar__greet text-white ml-1 sm-text-1">
              Hi, {user ? user.name : null}
            </h3>
          </Fragment>
        ) : (
          <Fragment>
            <h3 className="avatar__greet text-white ml-1 sm-text-1">
              Housekeeping App
            </h3>
          </Fragment>
        )}
      </div>
      <div className="hamburger">
        <span className="hamburger__line"></span>
        <input
          type="checkbox"
          className="hamburger__checkbox"
          name="hamburger"
          id="hamburger"
        />
      </div>
    </nav>
  );
};

export default connect(state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user
}))(Navbar);
