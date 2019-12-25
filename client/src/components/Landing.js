import React from "react";

const Landing = () => {
  return (
    <div className="container border ">
      <form action="" className="form">
        <label htmlFor="name">Name: </label>
        <input
          className="padding-small rounded margin-small-x "
          name="name"
          type="text"
        />
        <label htmlFor="email">Email: </label>
        <input
          className="padding-small rounded margin-small-x "
          name="email"
          type="text"
        />
        <label htmlFor="password">Password: </label>
        <input
          className="padding-small rounded margin-small-x "
          name="password"
          type="text"
        />
        <input className="padding-small margin-y" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Landing;
