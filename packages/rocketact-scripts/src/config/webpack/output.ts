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
    const filenameTemplate = isDevelopmentEnv()
      ? "js/[name].bundle.js"
      : "js/[name].[chunkhash:8].js";

    webpackChain.output
      .pathinfo(isDevelopmentEnv())
      .filename(filenameTemplate)
      .chunkFilename(filenameTemplate)
      .publicPath(
        isDevelopmentEnv()
          ? "/"
          : ensureTrailingSlash(require(appPackageJson()).publicPath || "/")
      )
      .path(isProductionEnv() ? appBuild() : "/")
      .end();
  });
};
