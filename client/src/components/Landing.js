import React from "react";
import axios from "axios";
const Landing = () => {
  const onClick = async e => {
    "google clicked";
    const res = await axios.get("/auth/google");
    console.log(res.data);
  };
  return (
    <div className="container border ">
      <form action="" className="form">
        <label htmlFor="name">Name: </label>
        <input
          className="padding-small  margin-small-x "
          name="name"
          type="text"
        />
        <label htmlFor="email">Email: </label>
        <input
          className="padding-small  margin-small-x "
          name="email"
          type="text"
        />
        <label htmlFor="password">Password: </label>
        <input
          className="padding-small  margin-small-x "
          name="password"
          type="text"
        />
        <input className="padding-small margin-y" type="submit" value="Login" />
      </form>
      <button onClick={onClick}>Google Login</button>
    </div>
  );
};

export default Landing;
