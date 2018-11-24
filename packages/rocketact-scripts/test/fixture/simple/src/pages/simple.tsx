import React from "react";
import ReactDOM from "react-dom";

import "./simple.scss";

import logo from "../assets/logo.png";

ReactDOM.render(
  <div>
    <h1>hello world</h1>
    <img src={logo} />
  </div>,
  document.getElementById("app")
);
