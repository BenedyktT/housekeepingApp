import { TOGGLE_NAVBAR_OPEN } from "./types";

export const toggleNavbar = () => dispatch => {
  dispatch({
    type: TOGGLE_NAVBAR_OPEN
  });
};
