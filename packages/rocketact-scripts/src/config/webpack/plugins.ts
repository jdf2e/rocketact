const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var ProgressBarPlugin = require("progress-bar-webpack-plugin");

import createHtmlWebpackPluginInstance from "../../utils/createHtmlWebpackPluginInstance";

import { info, infoBlock, success, successBlock } from "rocketact-dev-utils";

import webpack from "webpack";
import path from "path";

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";
import ConsolePlugin from "../../plugins/console";

import {
  getValidEntries,
  ensureTrailingSlash,
  appRoot
} from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    if (isDevelopmentEnv()) {
      webpackChain.plugin("ConsolePlugin").use(ConsolePlugin, [
        {
          messages: [
            () =>
              `Your application is running at ${info(
                `http://localhost:${global.ROCKETACT_PORT}`
              )}`
          ],
          notes: [`To create a production bundle, run ${info("npm run build")}`]
        }
      ]);
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
        .end()
        .plugin("ProgressBarPlugin")
        .use(ProgressBarPlugin, [
          {
            format: `${infoBlock(" WAITING ")} ${info("[:bar] (:percent)")}`,
            summary: false,
            customSummary: (time: number) => {
              console.log(
                `${successBlock(" SUCCESS ")} ${success(
                  `Build completed in ${time}`
                )}`
              );
            }
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
          createHtmlWebpackPluginInstance({
            entryName,
            template: entry.html
          })
        )
        .end();
    });
  });
};
