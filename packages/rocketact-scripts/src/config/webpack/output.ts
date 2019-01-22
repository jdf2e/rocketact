import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

import {
  ensureTrailingSlash,
  appPackageJson,
  resolveToAppRoot,
  appBuild
} from "rocketact-dev-utils";

const pkg = require(appPackageJson());

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
          : ensureTrailingSlash(pkg.publicPath || pkg.cdn || "/")
      )
      .path(isProductionEnv() ? appBuild() : "/")
      .end();
  });
};
