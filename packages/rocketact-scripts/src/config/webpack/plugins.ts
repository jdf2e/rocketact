const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import webpack from "webpack";

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

import * as paths from "rocketact-dev-utils/dist/paths";
import { ensureTrailingSlash } from "rocketact-dev-utils/dist/ensureTrailingSlash";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    if (isDevelopmentEnv()) {
      webpackChain
        .plugin("NamedModulesPlugin")
        .use(webpack.NamedModulesPlugin)
        .end()
        .plugin("DefinePlugin")
        .use(webpack.DefinePlugin, [{ __DEV__: true }])
        .end()
        .plugin("NoEmitOnErrorsPlugin")
        .use(webpack.NoEmitOnErrorsPlugin)
        .end();
    }

    if (isProductionEnv()) {
      webpackChain
        .plugin("HashedModuleIdsPlugin")
        .use(webpack.HashedModuleIdsPlugin)
        .end()
        .plugin("MiniCssExtractPlugin")
        .use(MiniCssExtractPlugin)
        .end();
    }
  });
};
