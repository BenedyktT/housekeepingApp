import { TOGGLE_NAVBAR_OPEN } from "../actions/types";
const initialState = {
  isNavbarOpen: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_NAVBAR_OPEN:
      if (payload === "close") {
        return { isNavbarOpen: false };
      } else {
        return { isNavbarOpen: !state.isNavbarOpen };
      }

    default:
      return state;
  }
};
