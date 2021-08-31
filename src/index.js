import "./styles/styles.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

const init = () => {
  ReactDOM.render(
    <App/>,
    document.body.querySelector('#root')
  )
};

init();
