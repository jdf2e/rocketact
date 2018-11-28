const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

import webpack from "webpack";
import path from "path";

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

import {
  getValidEntries,
  ensureTrailingSlash,
  appRoot
} from "rocketact-dev-utils";

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
        .end()
        .plugin("HotModuleReplacementPlugin")
        .use(webpack.HotModuleReplacementPlugin)
        .end();
    }

    if (isProductionEnv()) {
      webpackChain
        .plugin("HashedModuleIdsPlugin")
        .use(webpack.HashedModuleIdsPlugin)
        .end()
        .plugin("MiniCssExtractPlugin")
        .use(MiniCssExtractPlugin, [
          {
            filename: "css/[name].[contenthash:8].css"
          }
        ])
        .end();
    }

    const validEntries = getValidEntries(appRoot());
    Object.keys(validEntries).forEach(entryName => {
      const entry = validEntries[entryName];
      webpackChain
        .plugin(`HtmlWebpackPlugin-${entryName}`)
        .use(
          new HtmlWebpackPlugin({
            filename: `${entryName}.html`,
            template: entry.html,
            chunks: [entryName],
            inject: true
          })
        )
        .end();
    });
  });
};
