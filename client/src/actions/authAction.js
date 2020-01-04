import { LOGIN_USER, USER_LOADED, LOGOUT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loginUser = (name, password) => async dispatch => {
  const res = await axios.post("/user/login", { name, password });
  dispatch({
    type: LOGIN_USER,
    payload: res.data
  });
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/user");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
};
