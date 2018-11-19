import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

import * as paths from "rocketact-dev-utils/dist/paths";
import { ensureTrailingSlash } from "rocketact-dev-utils/dist/ensureTrailingSlash";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    webpackChain.output
      .pathinfo(isDevelopmentEnv())
      .filename("[name].bundle.js")
      .chunkFilename("[name].bundle.js")
      .publicPath(
        isDevelopmentEnv()
          ? "/"
          : ensureTrailingSlash(require(paths.appPackageJson()).publicPath) ||
            "/"
      )
      .path(isProductionEnv() ? paths.appBuild() : "/")
      .end();
  });
};
