import WebpackChain from "webpack-chain";
import {
  error,
  appPackageJson,
  isPlugin,
  resolveToAppRoot
} from "rocketact-dev-utils";
import minimist from "minimist";
import glob from "glob";
import fs from "fs";

import CoreAPI from "./CoreAPI";

export interface webpackChainFn {
  (webpackChain: WebpackChain): void;
}

class Core {
  private webpackConfigResolved: boolean;
  pkg: any;

  webpackChainFns: webpackChainFn[];
  commands: {
    [key: string]: { fn: () => Promise<any> };
  };
  webpackChain: WebpackChain;

  constructor() {
    this.webpackChainFns = [];
    this.webpackChain = new WebpackChain();
    this.commands = {};
    this.webpackConfigResolved = false;
    this.pkg = JSON.parse(fs.readFileSync(appPackageJson()).toString());
  }

  applyWebpackChainFns() {
    this.webpackChainFns.forEach(fn => fn(this.webpackChain));
  }

  resolveBuiltInPlugins() {
    const builtInPlugins = [
      ...glob.sync("./commands/*.*", {
        cwd: __dirname
      }),
      ...glob.sync("./config/**/*.*", {
        cwd: __dirname
      })
    ];
    builtInPlugins.forEach(file => require(file).default(new CoreAPI(this)));
  }

  resolveInstalledPlugins() {
    const installedPlugins = Object.keys(this.pkg.dependencies || {})
      .filter(isPlugin)
      .concat(Object.keys(this.pkg.devDependencies || {}).filter(isPlugin));
    installedPlugins.forEach(plugin =>
      require(resolveToAppRoot(`./node_modules/${plugin}`))(new CoreAPI(this))
    );
  }

  resolveProjectPlugins() {
    if (Array.isArray(this.pkg.rocketactPlugins)) {
      this.pkg.rocketactPlugins.forEach((plugin: string) =>
        require(resolveToAppRoot(plugin))(new CoreAPI(this))
      );
    }
  }

  resolveWebpackConfig() {
    if (!this.webpackConfigResolved) {
      this.applyWebpackChainFns();
      this.webpackConfigResolved = true;
    }
    return this.webpackChain.toConfig();
  }

  run(command: string, args: minimist.ParsedArgs): Promise<any> {
    this.resolveBuiltInPlugins();
    this.resolveInstalledPlugins();
    this.resolveProjectPlugins();

    if (!this.commands[command]) {
      console.log(error(`Subcommand [${command}] does not exist!`));
      process.exit(1);
    }

    return this.commands[command].fn();
  }
}

export default Core;
