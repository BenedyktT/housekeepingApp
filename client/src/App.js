import React, { useEffect } from "react";
import "./styles/app.scss";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/Landing.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HousekeepingReport from "./components/rooms/HousekeepingReport";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/authAction";
import PrivateRoute from "./components/routing/PrivateRoute";
import SideBar from "./components/layout/SideBar";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import About from "./components/static/About";
import Alert from "./components/layout/Alert";

if (localStorage.getItem("token")) {
	setAuthToken(localStorage.getItem("token"));
}

const App = () => {
	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.dispatch(loadUser());
		}
	}, []);
	return (
		<Provider store={store}>
			<Navbar />

			<Router>
				<SideBar />
				<Alert />
				<Route path="/" exact component={Landing} />
				<Switch>
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/about" component={About} />
					<PrivateRoute exact path="/report" component={HousekeepingReport} />
					<PrivateRoute exact path="/register" component={Register} />
				</Switch>
			</Router>
		</Provider>
	);
};
export default App;
