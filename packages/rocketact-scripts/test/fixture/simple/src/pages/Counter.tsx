import React from "react";

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
  }

  render() {
    return (
      <div>
        <h1>
          hello world {this.state.count}
          <button
            onClick={() => this.setState({ count: this.state.count + 1 })}
          >
            +
          </button>
        </h1>

        <img src={logo} />
      </div>
    );
  }
}

export default hot(module)(Counter);
