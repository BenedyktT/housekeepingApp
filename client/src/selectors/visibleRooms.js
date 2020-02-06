import { SHOW_ALL, SHOW_UNCLEAN } from "../actions/types";
export default (rooms, { filterCleanRoomsMethod, setVisibleHallway }) => {
	return rooms
		.filter(({ cleanStatus }) => {
			if (filterCleanRoomsMethod === SHOW_UNCLEAN) {
				return cleanStatus === "Not Clean";
			}
			if (filterCleanRoomsMethod === SHOW_ALL) {
				return true;
			}

			return true;
		})
		.filter(({ number }) => {
			const num = parseInt(number);
			const selectedHallway = parseInt(setVisibleHallway) || "all";
			const hallwayTreshhold = {
				100: 116,
				200: 212,
				213: 224,
				300: 312,
				313: 324
			};
			if (setVisibleHallway === "all") {
				return true;
			}
			return num >= selectedHallway && num <= hallwayTreshhold[selectedHallway];
		});
};
