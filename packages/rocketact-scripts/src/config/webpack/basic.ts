import path from "path";
import { appRoot } from "rocketact-dev-utils";
const PnpWebpackPlugin = require("pnp-webpack-plugin");

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
      .end();

    // detect PnP environment
    if ((process.versions as any).pnp) {
      webpackChain.resolve.plugin("PnpWebpackPlugin").use(PnpWebpackPlugin);
      webpackChain.resolveLoader
        .plugin("PnpWebpackPlugin")
        .use(PnpWebpackPlugin.moduleLoader(module));
    }
  });
};
