import { LOGIN_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  loading: true
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOGIN_USER:
      console.log("user loaded");
      return state;

    default:
      return state;
  }
};
