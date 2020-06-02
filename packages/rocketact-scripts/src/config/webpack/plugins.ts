const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const CopyPlugin = require("copy-webpack-plugin");

import createHtmlWebpackPluginInstance from "../../utils/createHtmlWebpackPluginInstance";

import {
  info,
  infoBlock,
  success,
  successBlock,
  checkPackageInstalled,
  appBuild,
  resolveToAppRoot,
} from "rocketact-dev-utils";

import webpack from "webpack";
import fs from "fs";

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";
import ConsolePlugin from "../../plugins/console";

import {
  getValidEntries,
  ensureTrailingSlash,
  appRoot,
} from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.chainWebpack((webpackChain) => {
    if (isDevelopmentEnv()) {
      webpackChain.plugin("ConsolePlugin").use(ConsolePlugin, [
        {
          messages: [
            () =>
              `Your application is running at ${info(
                `http://localhost:${global.ROCKETACT_PORT}`
              )}`,
          ],
          notes: [
            `To create a production bundle, run ${info("npm run build")}`,
          ],
        },
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

    webpackChain.plugin("InterpolateHtmlPlugin").use(InterpolateHtmlPlugin, [
      {
        PUBLIC_URL: process.env.PUBLIC_URL || "",
      },
    ]);
  });
};
