import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container">
      <h1>This is housekeeping app made by Benedykt Tyminski for Hotel Laki</h1>
      <div className="">version 1.0.0 alpha</div>
      <div className="centered margin-primary">
        <Link to="/" className="btn btn--dark ">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default About;
