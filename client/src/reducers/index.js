import { combineReducers } from "redux";
import roomReducer from "./roomsReducer";
import filterReducer from "./filterReducer";
import authReducer from "./authReducer";
import layoutReducer from "./layoutReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  roomReducer,
  filterReducer,
  authReducer,
  layoutReducer,
  alertReducer
});
