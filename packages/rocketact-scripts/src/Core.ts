import WebpackChain from "webpack-chain";

import CoreAPI from "./CoreAPI";

export interface webpackChainFn {
  (webpackChain: WebpackChain): void;
}

class Core {
  webpackChainFns: webpackChainFn[];
  commands: {
    [key: string]: { fn: () => void };
  };
  webpackChain: WebpackChain;

  constructor() {
    this.webpackChainFns = [];
    this.webpackChain = new WebpackChain();
    this.commands = {};
  }

  applyWebpackChainFns() {
    this.webpackChainFns.forEach(fn => fn(this.webpackChain));
  }

  run() {
    // this.applyAp
  }
}

export default Core;
