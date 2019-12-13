export default (rooms, { filterCleanRoomsMethod, setVisibleHallway }) => {
  console.log(setVisibleHallway);
  return rooms
    .filter(({ number, cleanStatus, vacancy, roomStatus }) => {
      if (filterCleanRoomsMethod === "SHOW_UNCLEAN") {
        return cleanStatus === "Not Clean";
      }
      if (filterCleanRoomsMethod === "SHOW_ALL") {
        return true;
      }
    })
    .filter(({ number }) => {
      if (setVisibleHallway === "all") {
        return true;
      }
      if (setVisibleHallway === "100") {
        return parseInt(number) <= 116;
      }
      if (setVisibleHallway === "200") {
        return parseInt(number) > 116 && parseInt(number) <= 224;
      }
    });
};
