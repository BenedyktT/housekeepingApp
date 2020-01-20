import React, { useState } from "react";
import { connect } from "react-redux";
import { setLanguage } from "../../actions/settingsAction";

const Settings = ({ language, setLanguage }) => {
	const [checkedValue, setCheckedValue] = useState(language);
	console.log(language);
	return (
		<div className="container border ">
			<div className="border container">
				<h1>{language === "pl" ? "Wybierz Jezyk" : "Language"}</h1>
				<label htmlFor="en">English</label>
				<input
					className="margin-primary"
					type="radio"
					name="en"
					value="en"
					onChange={() => {
						setCheckedValue("en");
						setLanguage("en");
					}}
					checked={checkedValue === "en"}
				/>
				<label htmlFor="pl">Polski</label>
				<input
					className="margin-primary"
					type="radio"
					name="pl"
					value="pl"
					onChange={() => {
						setCheckedValue("pl");
						setLanguage("pl");
					}}
					checked={checkedValue === "pl"}
				/>
			</div>
		</div>
	);
};

export default connect(
	state => ({ language: state.settingsReducer.language }),
	{ setLanguage }
)(Settings);
