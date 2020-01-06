import { LOGIN_USER, USER_LOADED, LOGOUT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alerts";

export const loginUser = (name, password) => async dispatch => {
  try {
    const res = await axios.post("/user/login", { name, password });
    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors.length) {
      errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
    }

    console.log(errors);
  }
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
    const errors = error.response.data.errors;
    if (errors.length) {
      errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
    }
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
};
