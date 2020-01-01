import React, { useEffect } from "react";
import "./styles/app.scss";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/Landing.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HousekeepingReport from "./components/rooms/HousekeepingReport";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.getItem("token")) {
	setAuthToken(localStorage.getItem("token"));
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Navbar />
			<Router>
				<Route path="/" exact component={Landing} />
				<Switch>
					<Route path="/report" component={HousekeepingReport} />
				</Switch>
			</Router>
		</Provider>
	);
};
export default App;
