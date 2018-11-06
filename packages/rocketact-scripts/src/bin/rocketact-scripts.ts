import semver from "semver";
import chalk from "chalk";

// import pkg from "../../package.json";
const pkg = require("../../package.json");

if (!semver.satisfies("1.1.1", pkg.engines.node)) {
  console.log(
    `rocketact-scripts requires Node version ${chalk.green(
      pkg.engines.node
    )}, but you are using ${chalk.red(
      process.version.replace(/^v/, "")
    )}. Please upgrade your Node first.`
  );

  process.exit(1);
}
