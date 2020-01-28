import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadRooms, setClean, getCleanRooms } from "../../actions/roomsActions";
import visibleRooms from "../../selectors/visibleRooms";
import classnames from "classnames";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import disableScroll from "disable-scroll";
import moment from "moment";
import Vacuum from "../../img/vacuum-cleaner.svg";

const Rooms = ({
	rooms,
	loadRooms,
	setReportDate,
	isNavbarOpen,
	setClean,
	language
}) => {
	const pl = {
		ready: "Zrobione",
		clean: "Czysty",
		room: "Pokoj",
		vacant: "Wolne",
		occupied: "Zajety",
		arriving: "Przyjazd",
		not_clean: "Nieczysty",
		stayover: "Stayover",
		out_of_order: "Zepsuty",
		departure: "Wyjazd",
		departure_arriving: "Wyjazd + Przyjazd"
	};
	const en = {
		ready: "Ready",
		occupied: "Occupied",
		clean: "Clean",
		room: "Room",
		vacant: "vacant",
		arriving: "Arriving",
		clean: "clean",
		not_clean: "Not Clean",
		stayover: "Stayover",
		out_of_order: "Out of Order",
		departure: "Departure",
		departure_arriving: "Departure + Arriving"
	};
	const t = text => {
		let key;
		if (text) {
			key = text.replace(/ |\+/g, "_").toLowerCase();
		}
		if (language === "pl") {
			return pl[key];
		}
		if (language === "en") {
			return en[key];
		}
	};
	const roomAction = (cleanedBy, number, cleanStatus) => {
		const isSame = moment(setReportDate.n).isSame(moment(), "day");
		if (cleanedBy) {
			return (
				<p className="text-small">
					{t("ready")} -{" "}
					<span className="pink">
						{cleanedBy.charAt(0).toUpperCase() + cleanedBy.substring(1)}
					</span>
				</p>
			);
		} else if (!isSame) {
			return null;
		} else if (cleanStatus === "Clean") {
			return null;
		} else {
			return (
				<button
					onClick={() => {
						setClean(number);
					}}
					className="set-clean"
				>
					{t("clean")}{" "}
					<img src={Vacuum} height="20px" width="20px" alt="setClean" />
				</button>
			);
		}
	};
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
		return rooms.map(room => {
			const {
				number,
				cleanStatus,
				vacancy,
				roomStatus,
				roomNote,
				cleanedBy
			} = room;

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
						{roomAction(cleanedBy, number, cleanStatus)}
						<h4 className="bold">
							{t("room")} {number}
						</h4>
					</div>
					<span className="hor-line"></span>
					<div className="room__col--right">
						<p className="occupancy ">{t(vacancy)}</p>
						<p className="reservation">{t(roomStatus)}</p>
						<p
							className={
								cleanStatus === "Clean" ? "success clean" : "danger clean"
							}
						>
							{t(cleanStatus)}
						</p>
						{roomNote && <p className="note small">{roomNote}</p>}
					</div>
				</div>
			);
		});
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
		isNavbarOpen: state.layoutReducer.isNavbarOpen,
		language: state.settingsReducer.language
	}),
	{ loadRooms, setClean, getCleanRooms }
)(Rooms);
