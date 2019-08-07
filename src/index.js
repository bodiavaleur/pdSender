import React from "react";
import ReactDOM from "react-dom";
import PrimeDate from "./PrimeDate";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./sfFont.css";
import "./iosSwitch.css";

ReactDOM.render(
  <Provider store={store}>
    <PrimeDate />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
