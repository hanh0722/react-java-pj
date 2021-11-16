import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store/store";
import DarkModeProvider from "./components/darkmode-context/darkmode-content";
import IsAuthProvider from "./context/is-auth";
ReactDOM.render(
  <Provider store={store}>
    <IsAuthProvider>
      <DarkModeProvider>
        <Router>
          <App />
        </Router>
      </DarkModeProvider>
    </IsAuthProvider>
  </Provider>,
  document.getElementById("root")
);
