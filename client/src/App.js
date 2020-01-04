import React, { useEffect } from "react";
import "./styles/app.scss";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/Landing.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HousekeepingReport from "./components/rooms/HousekeepingReport";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/authAction";
import PrivateRoute from "./components/routing/PrivateRoute";
import SideBar from "./components/layout/SideBar";
import Logout from "./components/auth/Logout";

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
        <SideBar />
        <Route path="/" exact component={Landing} />
        <Switch>
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/report" component={HousekeepingReport} />
        </Switch>
      </Router>
    </Provider>
  );
};
export default App;
