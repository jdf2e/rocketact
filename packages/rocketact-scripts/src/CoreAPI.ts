import Core, { webpackChainFn } from "./Core";

export default class CoreAPI {
  private readonly core: Core;
  constructor(core: Core) {
    this.core = core;
  }

  chainWebpack(fn: webpackChainFn) {
    this.core.webpackChainFns.push(fn);
  }

  registerCommand(name: string, fn: () => void) {
    this.core.commands[name] = { fn };
  }
}
