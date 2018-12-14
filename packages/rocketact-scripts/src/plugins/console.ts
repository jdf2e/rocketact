import path from "path";
import webpack = require("webpack");

import {
  error,
  errorBlock,
  success,
  successBlock,
  info,
  infoBlock,
  normalBlock,
  appRoot,
  clearConsole
} from "rocketact-dev-utils";

const plugin = "RocketactConsoleWebpackPlugin";

export default class ConsolePlugin {
  messages: (string | (() => string))[];
  notes: (string | (() => string))[];
  constructor(
    options: {
      messages?: (string | (() => string))[];
      notes?: (string | (() => string))[];
    } = {}
  ) {
    this.messages = options.messages || [];
    this.notes = options.notes || [];

    this.doneCallback = this.doneCallback.bind(this);
    this.invalidCallback = this.invalidCallback.bind(this);
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tap(plugin, this.doneCallback);
    compiler.hooks.invalid.tap(plugin, this.invalidCallback);
  }

  doneCallback(stats: webpack.Stats) {
    clearConsole();
    const hasErrors = stats.hasErrors();
    const hasWarnings = stats.hasWarnings();

    if (!hasErrors && !hasWarnings) {
      let duration: number = 0;
      if (
        typeof stats.endTime === "number" &&
        typeof stats.startTime === "number"
      ) {
        duration = stats.endTime - stats.startTime;
      }
      console.log(
        `${successBlock(" DONE ")} ${success(
          `Build Successfully ${
            duration > 0 ? `in ${(duration / 1000).toFixed(2)}s` : ""
          }`
        )}`
      );

      if (this.messages.length > 0) {
        console.log("");
        this.messages.forEach(m =>
          console.log(`${infoBlock(" I ")} ${typeof m === "string" ? m : m()}`)
        );
      }
      if (this.notes.length > 0) {
        console.log("");
        this.notes.forEach(n =>
          console.log(
            `${normalBlock(" N ")} ${typeof n === "string" ? n : n()}`
          )
        );
      }
    }

    if (hasErrors) {
      const errorObj = stats.compilation.errors[0];
      console.log(
        `${errorBlock(" ERROR ")} ${error(
          "Failed to compile with following error:"
        )}`
      );
      console.log("");
      if (errorObj.error.code === "BABEL_PARSE_ERROR") {
        console.log(
          `${errorBlock(" error ")} in ${errorObj.module.resource.replace(
            appRoot(),
            "."
          )}`
        );
        console.log("");
        console.log(errorObj.error.message.replace(/^[^:]*:/, "SyntaxError:"));
        return;
      }

      if (errorObj.name === "ModuleNotFoundError") {
        const missingModule = errorObj.error.message.match(
          /^Can't resolve '([^']+)'/
        );
        if (missingModule) {
          const moduleName = missingModule[1];
          if (moduleName[0] === ".") {
            console.log("This module is missing in project:");
            console.log("");
            console.log(
              `* ${path
                .resolve(errorObj.module.context, moduleName)
                .replace(appRoot(), ".")}`
            );
            console.log("");
            console.log("Do you forgot to create it?");
          } else {
            console.log("This dependency is missing in node_modules:");
            console.log("");
            console.log(`* ${moduleName}`);
            console.log("");
            console.log("Do you forgot to install it?");
          }

          return;
        }
      }

      console.log(errorObj.error.message);
    } else if (hasWarnings) {
      console.log("Build finished with warnings");
    }
  }

  invalidCallback() {
    clearConsole();
    console.log(`${infoBlock(" WAITING ")} ${info("Building...")}`);
  }
}
