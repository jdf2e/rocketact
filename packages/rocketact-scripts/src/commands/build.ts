import webpack from "webpack";

import CoreAPI from "../CoreAPI";

import { error, errorBlock, success, successBlock } from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.registerCommand(
    "build",
    (): Promise<any> => {
      process.env.NODE_ENV = "production";

      return new Promise((resolve, reject) => {
        const startTime = +new Date();
        webpack(api.resolveWebpackConfig(), (err, stats) => {
          const endTime = +new Date();
          const duration = ((endTime - startTime) / 100).toFixed(2);

          if (err || stats.hasErrors()) {
            console.log(
              `${errorBlock(" ERROR ")} ${error(
                `Build completed in ${duration}s`
              )} with following error:`
            );
            if (err) {
              console.log(error(`${err.name}: ${err.message}`));
              reject(err);
            } else {
              const info = stats.toJson();
              console.log(error(info.errors));
              reject(info.errors);
            }
          } else {
            console.log(
              `${successBlock(" SUCCESS ")} ${success(
                `Build completed in ${duration}s`
              )}`
            );
            resolve();
          }
        });
      });
    }
  );
};
