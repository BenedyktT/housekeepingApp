import React, { Fragment, useState } from "react";
import avatar from "../../img/hotel.svg";
import { connect } from "react-redux";
import classnames from "classnames";
import { toggleNavbar } from "../../actions/layoutAction";
import { ReactComponent as Reload } from "../../img/reload.svg";
import { ReactComponent as Top } from "../../img/top.svg";
import { loadRooms } from "../../actions/roomsActions";
import { Link } from "react-router-dom";
import { useScrollPosition } from "../helper/scrollSpy";

const Navbar = ({
	isAuthenticated,
	user,
	toggleNavbar,
	isNavbarOpen,
	loadRooms,
	getReportDate,
	loading
}) => {
	const [hideOnScroll, setHideOnScroll] = useState(true);
	useScrollPosition(
		({ prevPos, currPos }) => {
			const isShow = currPos.y > prevPos.y;
			if (isShow !== hideOnScroll) setHideOnScroll(isShow);
		},
		[hideOnScroll]
	);

	const [isBtnClicked, setBtnClicked] = useState(false);

	return (
		<Fragment>
			<nav className={hideOnScroll ? "nav" : "nav nav__scroll"}>
				<div className="avatar">
					{isAuthenticated ? (
						<Fragment>
							<Link to="/">
								<img src={avatar} alt="avatar" className="avatar__image" />
							</Link>

							<h3 className="avatar__greet text-white ml-1 sm-text-1">
								Hi,{" "}
								{user
									? user.name.charAt(0).toUpperCase() + user.name.slice(1)
									: "dear"}
							</h3>
						</Fragment>
					) : (
						<Fragment>
							<Link to="/">
								<h3 className="avatar__greet text-white ml-1 sm-text-1">
									Housekeeping App
								</h3>
							</Link>
						</Fragment>
					)}
				</div>
				<div className="flex-right">
					<button
						className="btn reload"
						onClick={() => {
							setBtnClicked(!isBtnClicked);
							loadRooms(getReportDate);
						}}
					>
						<Reload className={classnames({ active: loading })} />
					</button>
					<label className={classnames("hamburger-container")}>
						<div
							className={classnames("hamburger", {
								active: isNavbarOpen
							})}
						></div>
						<input
							type="checkbox"
							onChange={() => {
								toggleNavbar();
							}}
							className="hamburger__checkbox"
							name="hamburger"
							id="hamburger"
						/>
					</label>
				</div>
			</nav>

			<button
				onClick={() => {
					window.scrollTo({
						top: 0
					});
				}}
				className="btn scroll-to-top"
			>
				<Top className={classnames({ active: hideOnScroll })} />
			</button>
		</Fragment>
	);
};

export default connect(
	state => ({
		isAuthenticated: state.authReducer.isAuthenticated,
		user: state.authReducer.user,
		isNavbarOpen: state.layoutReducer.isNavbarOpen,
		getReportDate: state.filterReducer.getCurrentCalendarValue,
		loading: state.roomReducer.loading
	}),
	{ toggleNavbar, loadRooms }
)(Navbar);
