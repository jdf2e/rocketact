import * as React from "react";
import * as ReactDOM from "react-dom";

import "./app.scss";

import Welcome from "../components/Welcome";

ReactDOM.render(
  <div className="App">
    <Welcome message="Hello World!" />
  </div>,
  document.getElementById("app") as HTMLElement
);
