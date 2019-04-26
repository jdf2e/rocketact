import * as React from "react";

import logo from "./logo.svg";
import "./Welcome.scss";

const Welcome: React.SFC<{ message: string }> = props => {
  return (
    <div className="welcome-container">
      <img src={logo} />
      <p>{props.message}</p>
    </div>
  );
};

export default Welcome;
