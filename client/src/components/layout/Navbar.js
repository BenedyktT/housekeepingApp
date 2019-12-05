import React from "react";
import avatar from "../../img/ayo-ogunseinde-THIs-cpyebg-unsplash.jpg";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="avatar">
        <img src={avatar} alt="avatar" className="avatar__image" />
        <h3 className="avatar__greet text-white ml-1 sm-text-1">
          Hi, Angelika
        </h3>
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

export default Navbar;
