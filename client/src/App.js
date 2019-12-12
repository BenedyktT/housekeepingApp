import React from "react";
import "./styles/app.scss";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import store from "./store";
import Rooms from "./components/rooms/Rooms";
import FiltersBar from "./components/rooms/FiltersBar";

const App = () => (
	<Provider store={store}>
		<Navbar />
		<FiltersBar />
		<Rooms />
	</Provider>
);
export default App;
