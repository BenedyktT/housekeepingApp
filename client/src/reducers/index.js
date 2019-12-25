import { combineReducers } from "redux";
import roomReducer from "./roomsReducer";
import filterReducer from "./filterReducer";
import authReducer from "./authReducer";

export default combineReducers({
  roomReducer,
  filterReducer,
  authReducer
});
