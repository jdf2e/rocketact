import React from "react";
// import Redux from "mobx";
// import Redux1 from "./mobx1";
import { hot } from "react-hot-loader";

import logo from "../assets/logo.png";

interface ICounterState {
  count: number;
}

class Counter extends React.Component<{}, ICounterState> {
  constructor() {
    super();
    this.state = {
      count: 0
    };

    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    this.setState({ count: this.state.count + 1333333 });
    // console.log(Redux);
  }

  render() {
    return (
      <div>
        <h1>
          hello world {this.state.count}
          <button onClick={this.onClick}>+</button>
        </h1>

        <img src={logo} />
      </div>
    );
  }
}

export default hot(module)(Counter);
