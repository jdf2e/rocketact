import WebpackChain from "webpack-chain";

import CoreAPI from "./CoreAPI";

export interface webpackChainFn {
  (webpackChain: WebpackChain): void;
}

class Core {
  webpackChainFns: webpackChainFn[];
  webpackChain: WebpackChain;
  commands: {
    [key: string]: { fn: () => void };
  };

  constructor() {
    this.webpackChainFns = [];
    this.webpackChain = new WebpackChain();
    this.commands = {};
  }

  run() {
    // this.applyAp
  }
}

export default Core;
