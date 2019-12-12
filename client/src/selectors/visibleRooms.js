export default (rooms, { filterRooms }) => {
	return rooms.filter(({ number, cleanStatus, vacancy, roomStatus }) => {
		if (filterRooms === "SHOW_UNCLEAN") {
			return cleanStatus === "Not Clean";
		}
		if (filterRooms === "SHOW_ALL") {
			return true;
		}
	});
};
