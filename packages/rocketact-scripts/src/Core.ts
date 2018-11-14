import WebpackChain from "webpack-chain";
import { error } from "rocketact-dev-utils";
import minimist from "minimist";
import glob from "glob";

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

  resolveBuiltInPlugins() {
    const builtInPlugins = glob.sync("commands/*.*,./config/**/*.*", {
      cwd: __dirname
    });
    console.log(builtInPlugins);
  }

  run(command: string, args: minimist.ParsedArgs) {
    this.resolveBuiltInPlugins();
    this.applyWebpackChainFns();
    if (!this.commands["command"]) {
      console.log(error(`Subcommand [${command}] does not exist!`));
      process.exit(1);
    }
  }
}

export default Core;
