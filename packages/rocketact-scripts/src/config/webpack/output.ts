import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

import {
  ensureTrailingSlash,
  appPackageJson,
  resolveToAppRoot,
  appBuild
} from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    webpackChain.output
      .pathinfo(isDevelopmentEnv())
      .filename("js/[name].bundle.js")
      .chunkFilename("js/[name].bundle.js")
      .publicPath(
        isDevelopmentEnv()
          ? "/"
          : ensureTrailingSlash(require(appPackageJson()).publicPath || "/")
      )
      .path(isProductionEnv() ? appBuild() : "/")
      .end();
  });
};
