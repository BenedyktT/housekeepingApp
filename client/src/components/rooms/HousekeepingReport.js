import React from "react";
import FiltersBar from "./FiltersBar";
import Rooms from "./Rooms";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Overview from "./Overview";

const HousekeepingReport = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<div>
				<FiltersBar />
				<Overview />
				<Rooms />
			</div>
		);
	}
	return <Loader />;
};

export default connect(state => ({
	isAuthenticated: state.authReducer.isAuthenticated
}))(HousekeepingReport);
