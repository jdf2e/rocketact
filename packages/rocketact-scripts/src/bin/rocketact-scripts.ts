#!/usr/bin/env node
import semver from "semver";
import minimist from "minimist";
import path from "path";
import { error, success } from "rocketact-dev-utils";

import convertArgvsToEnv from "../utils/convertArgvsToEnv";

import Core from "../Core";

const pkg = require("../../package.json");

if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.log(
    `rocketact-scripts requires Node version ${success(
      pkg.engines.node
    )}, but you are using ${error(
      process.version.replace(/^v/, "")
    )}. Please upgrade your Node first.`
  );

  process.exit(1);
}

const core = new Core();

global.ROCKETACT_CORE = core;

const scriptName = path.basename(__filename).replace(/\.[tj]s$/, "");
const i = process.argv.findIndex(arg =>
  path.basename(arg).startsWith(scriptName)
);
const command = process.argv[i + 1];
const argvs = minimist(process.argv.slice(i + 2));
const environmentVariables = convertArgvsToEnv(argvs);

// set environment variables
Object.keys(environmentVariables).forEach(name => {
  process.env[name] = environmentVariables[name];
});

core.run(command, argvs).catch(e => console.log(e));
