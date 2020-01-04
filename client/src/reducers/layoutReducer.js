import { TOGGLE_NAVBAR_OPEN } from "../actions/types";
const initialState = {
  isNavbarOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAVBAR_OPEN:
      return { isNavbarOpen: !state.isNavbarOpen };

    default:
      return state;
  }
};
