import semver from "semver";
import { error, success } from "rocketact-dev-utils";

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
