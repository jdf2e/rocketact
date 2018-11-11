import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

import * as paths from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    webpackChain.output
      .pathinfo(isDevelopmentEnv())
      .filename("[name].bundle.js")
      .chunkFilename("[name].bundle.js")
      .publicPath(
        isDevelopmentEnv()
          ? "/"
          : require(paths.appPackageJson).publicPath || "/"
      )
      .path(isProductionEnv() ? paths.appBuild : "/");
  });
};
