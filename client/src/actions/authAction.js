import { LOGIN_USER } from "./types";

export const loginUser = () => dispatch => {
  dispatch({
    type: LOGIN_USER
  });
};
