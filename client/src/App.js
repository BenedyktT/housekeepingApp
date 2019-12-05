import React from "react";
import "./styles/app.scss";
import Navbar from "./components/layout/Navbar";
import { Provider } from "react-redux";
import store from "./store";
import Rooms from "./components/rooms/Rooms";

const App = () => (
  <Provider store={store}>
    <Navbar />
    <Rooms />
  </Provider>
);
export default App;
