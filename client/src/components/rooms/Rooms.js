import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { loadRooms, setClean, getCleanRooms } from "../../actions/roomsActions";
import visibleRooms from "../../selectors/visibleRooms";
import classnames from "classnames";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import disableScroll from "disable-scroll";
import moment from "moment";

const Rooms = ({
  rooms,
  loadRooms,
  setReportDate,
  isNavbarOpen,
  setClean,
  getCleanRooms
}) => {
  useEffect(() => {
    if (isNavbarOpen) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [isNavbarOpen]);
  useEffect(() => {
    if (!rooms.length) {
      loadRooms(setReportDate);
    }
  }, []);
  const render = () => {
    return rooms.map(
      ({ number, cleanStatus, vacancy, roomStatus, roomNote, cleanedBy }) => {
        return (
          <div
            key={number}
            className={classnames(
              "room",
              {
                "gradient-blue":
                  vacancy === "Vacant" ||
                  vacancy === "Clean" ||
                  vacancy === "Not Clean" ||
                  vacancy == null
              },
              { "gradient-pink": vacancy === "Occupied" },
              { "gradient-green": vacancy === "Stayover" },
              { "gradient-dark": vacancy === "Out of Order" }
            )}
          >
            <div className="room__col--left">
              {cleanedBy ? (
                <p className="text-small">
                  Cleaned by: {cleanedBy.toUpperCase()}
                </p>
              ) : (
                <button
                  onClick={e => {
                    setClean(
                      number,
                      setReportDate.n || moment().format("YYYY-MM-DD")
                    );
                  }}
                  className="set-clean"
                >
                  Set Clean <i className="fas fa-broom"></i>
                </button>
              )}
              <h4 className="bold">Room {number}</h4>
            </div>
            <span className="hor-line"></span>
            <div className="room__col--right">
              <p className="occupancy small">{vacancy}</p>
              <p className="reservation">{roomStatus}</p>
              <p
                className={
                  cleanStatus === "Clean"
                    ? "success clean small"
                    : "danger clean small"
                }
              >
                {cleanStatus}
              </p>
              {roomNote && <p className="note small">{roomNote}</p>}
            </div>
          </div>
        );
      }
    );
  };
  return (
    <div className="container">
      {rooms.length ? (
        render()
      ) : (
        <div className="loader-container">
          <Loader
            type="CradleLoader"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={4000} //3 secs
          />
        </div>
      )}
    </div>
  );
};

export default connect(
  state => ({
    rooms: visibleRooms(state.roomReducer.roomsReport, state.filterReducer),
    cleanRooms: state.roomReducer.cleanRooms,
    setReportDate: state.filterReducer.getCurrentCalendarValue,
    isNavbarOpen: state.layoutReducer.isNavbarOpen
  }),
  { loadRooms, setClean, getCleanRooms }
)(Rooms);
