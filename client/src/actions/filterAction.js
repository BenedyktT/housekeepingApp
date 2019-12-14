import {
  SHOW_UNCLEAN,
  SHOW_ALL,
  SELECT_HALLWAY,
  GET_CURRENT_CALENDAR_VALUE
} from "./types";

export const showUnclean = () => dispatch => dispatch({ type: SHOW_UNCLEAN });
export const showAll = () => dispatch => dispatch({ type: SHOW_ALL });
export const selectHallway = hallway => dispatch =>
  dispatch({ type: SELECT_HALLWAY, payload: hallway });
export const getCurrentCalendarValue = currentDate => dispatch =>
  dispatch({ type: GET_CURRENT_CALENDAR_VALUE, payload: currentDate });
