import Core, { webpackChainFn } from "./Core";
import * as webpack from 'webpack';

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

  resolveWebpackConfig(): webpack.Configuration {
    return this.core.resolveWebpackConfig();
  }
}
