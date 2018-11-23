import Core, { webpackChainFn } from "./Core";

export default class CoreAPI {
  private readonly core: Core;
  constructor(core: Core) {
    this.core = core;
  }

  chainWebpack(fn: webpackChainFn) {
    this.core.webpackChainFns.push(fn);
  }

  registerCommand(name: string, fn: () => Promise<any>) {
    this.core.commands[name] = { fn };
  }

  resolveWebpackConfig() {
    return this.core.resolveWebpackConfig();
  }
}
