import { TOGGLE_NAVBAR_OPEN } from "./types";

export const toggleNavbar = setNavbar => dispatch => {
  dispatch({
    type: TOGGLE_NAVBAR_OPEN,
    payload: setNavbar
  });
};
