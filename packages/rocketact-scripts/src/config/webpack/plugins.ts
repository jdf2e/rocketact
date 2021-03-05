import { PluginClass } from "webpack-chain";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

import createHtmlWebpackPluginInstance from "../../utils/createHtmlWebpackPluginInstance";

import {
  info,
  infoBlock,
  checkPackageInstalled,
  appBuild,
  resolveToAppRoot,
} from "rocketact-dev-utils";

import webpack from "webpack";
import fs from "fs";

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";
import ConsolePlugin from "../../plugins/console";

import { getValidEntries, appRoot } from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.chainWebpack((webpackChain) => {
    if (isDevelopmentEnv()) {
      // @ts-ignore
      webpackChain.plugin("ConsolePlugin").use(ConsolePlugin, [
        {
          messages: [
            () =>
              `Your application is running at ${info(
                `http${process.env.HTTPS ? "s" : ""}://localhost:${
                  global.ROCKETACT_PORT
                }`
              )}`,
          ],
          notes: [
            `To create a production bundle, run ${info("npm run build")}`,
          ],
        },
      ]);
      webpackChain
        // https://webpack.js.org/migrate/4/#deprecatedremoved-plugins
        .plugin("DefinePlugin")
        // @ts-ignore
        .use(webpack.DefinePlugin, [{ __DEV__: true }])
        .end()
        .plugin("HotModuleReplacementPlugin")
        .use(new webpack.HotModuleReplacementPlugin() as PluginClass)
        .end();
      //suport react-refresh
      webpackChain.plugin("react-refresh").use(ReactRefreshWebpackPlugin);
    }

    if (isProductionEnv()) {
      webpackChain
        // https://www.webpackjs.com/plugins/hashed-module-ids-plugin/
        .plugin("HashedModuleIdsPlugin")
        .use(new webpack.HashedModuleIdsPlugin() as PluginClass) // new (...opts: any[]): webpack.Plugin;
        .end()
        .plugin("MiniCssExtractPlugin")
        .use(MiniCssExtractPlugin, [
          {
            filename: process.env.NO_HASH
              ? "css/[name].bundle.css"
              : "css/[name].[contenthash:8].css",
          },
        ])
        .end()
        .plugin("ProgressBarPlugin")
        .use(ProgressBarPlugin, [
          {
            format: `${infoBlock(" WAITING ")} ${info("[:bar] (:percent)")}`,
            summary: false,
          },
        ])
        .end()
        .plugin("CopyPlugin")
        .use(CopyPlugin, [
          [
            {
              from: "public/**",
              to: appBuild(),
              context: appRoot(),
              transformPath: (targetPath: string) =>
                targetPath.replace(/^public\//, ""),
            },
          ],
        ]);

      // Configure TypeScript check and TSLint check
      const enableTSLintCheck =
        checkPackageInstalled("tslint") &&
        fs.existsSync(resolveToAppRoot("tslint.json"));

      const enableTSCheck =
        checkPackageInstalled("typescript") &&
        fs.existsSync(resolveToAppRoot("tsconfig.json"));

      if (enableTSLintCheck && enableTSCheck) {
        webpackChain
          .plugin("ForkTsCheckerWebpackPlugin")
          .use(ForkTsCheckerWebpackPlugin, [
            {
              tsconfig: resolveToAppRoot("tsconfig.json"),
              tslint: enableTSLintCheck
                ? resolveToAppRoot("tslint.json")
                : undefined,
              async: false,
              typescript: require.resolve("typescript", {
                paths: [appRoot()],
              }),
              silent: true,
            },
          ]);
      }
    }

    const validEntries = getValidEntries(appRoot());
    Object.keys(validEntries).forEach((entryName) => {
      const entry = validEntries[entryName];

      webpackChain
        .plugin(`HtmlWebpackPlugin-${entryName}`)
        .use(
          ...createHtmlWebpackPluginInstance({
            entryName,
            template: entry.html,
          })
        )
        .end();
    });
  });
};
