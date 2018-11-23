import webpack from "webpack";

import CoreAPI from "../CoreAPI";

import { error, success } from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.registerCommand(
    "build",
    (): Promise<any> => {
      process.env.NODE_ENV = "production";

      return new Promise((resolve, reject) => {
        webpack(api.resolveWebpackConfig(), (err, stats) => {
          if (err || stats.hasErrors()) {
            console.log(error(`${err.name}: ${err.message}`));
            reject(err);
          } else {
            console.log("Build Success!");
            resolve();
          }
        });
      });
    }
  );
};
