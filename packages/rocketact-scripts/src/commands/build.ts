import webpack from "webpack";

import CoreAPI from "../CoreAPI";

import { error, success } from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.registerCommand("build", () => {
    process.env.NODE_ENV = "production";

    webpack(api.resolveWebpackPlugins(), (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(error(`${err.name}: ${err.message}`));
      } else {
        console.log("Build Success!");
      }
    });
  });
};
