import { combineReducers } from "redux";
import roomReducer from "./roomsReducer";
import filterReducer from "./filterReducer";

export default combineReducers({
	roomReducer,
	filterReducer
});
