import { SHOW_UNCLEAN, SHOW_ALL, SELECT_HALLWAY } from "./types";

export const showUnclean = () => dispatch => dispatch({ type: SHOW_UNCLEAN });
export const showAll = () => dispatch => dispatch({ type: SHOW_ALL });
export const selectHallway = hallway => dispatch =>
  dispatch({ type: SELECT_HALLWAY, payload: hallway });
