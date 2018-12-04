import path from "path";
import { appRoot } from "rocketact-dev-utils";

import CoreAPI from "../../CoreAPI";
import { isDevelopmentEnv } from "../../utils/environment";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    webpackChain
      .set("mode", process.env.NODE_ENV)
      .devtool(isDevelopmentEnv() ? "cheap-module-source-map" : "source-map")
      .resolve.extensions.add(".js")
      .add(".ts")
      .add(".jsx")
      .add(".tsx")
      .end()
      .alias.set(
        "react-hot-loader",
        path.resolve(appRoot(), "./node_modules/react-hot-loader")
      );
  });
};
