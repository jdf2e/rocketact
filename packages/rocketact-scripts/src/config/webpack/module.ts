const MiniCssExtractPlugin = require("mini-css-extract-plugin");

import path from "path";

import CoreAPI from "../../CoreAPI";

import { isDevelopmentEnv, isProductionEnv } from "../../utils/environment";

import { getValidEntries, appRoot, appSrc } from "rocketact-dev-utils";

const merge = require("babel-merge");

export default (api: CoreAPI) => {
  api.chainWebpack((webpackChain) => {
    webpackChain.module
      .rule("font")
      .test(/\.(ttf|eot|woff|woff2)$/)
      .use("file")
      .loader(require.resolve("file-loader"))
      .options({
        name: "css/fonts/[name].[ext]",
      })
      .end()
      .end()
      .rule("compile")
      .test(/\.[tj]sx?$/)
      .include.add(appSrc())
      .end()
      .use("babel")
      .loader(require.resolve("babel-loader"))
      .options({
        presets: [require.resolve("babel-preset-rocketact")],
        cacheDirectory: true,
      })
      .end()
      .end()
      .end();

    if (isDevelopmentEnv()) {
      webpackChain.module
        .rule("scss")
        .test(/(?<!module)\.(css|sass|scss)$/) // extract css-module
        .use("style")
        .loader(require.resolve("style-loader"))
        .options({
          sourceMap: true,
        })
        .end()
        .use("css")
        .loader(require.resolve("css-loader"))
        .options({
          sourceMap: true,
        })
        .end()
        .use("postcss")
        .loader(require.resolve("postcss-loader"))
        .options({
          sourceMap: true,
        })
        .end()
        .use("scss")
        .loader(require.resolve("sass-loader"))
        .options({
          sourceMap: true,
          outputStyle: "compressed",
          implementation: require("node-sass"),
        })
        .end()
        .end();

      // support css-module
      webpackChain.module
        .rule("scss-module")
        .test(/\.module\.(css|sass|scss)$/)
        .use("style")
        .loader(require.resolve("style-loader"))
        .options({
          sourceMap: true,
        })
        .end()
        .use("css")
        .loader(require.resolve("css-loader"))
        .options({
          sourceMap: true,
          modules: true,
          localIdentName: "[name]_[local]__[hash:base64:5]",
        })
        .end()
        .use("postcss")
        .loader(require.resolve("postcss-loader"))
        .options({
          sourceMap: true,
        })
        .end()
        .use("scss")
        .loader(require.resolve("sass-loader"))
        .options({
          sourceMap: true,
          outputStyle: "compressed",
          implementation: require("node-sass"),
        })
        .end()
        .end();

      webpackChain.module
        .rule("image")
        .test(/\.(png|jpg|gif|svg|jpeg|webp)$/)
        .use("file")
        .loader(require.resolve("file-loader"))
        .options({
          name: "css/i/[name].[hash:8].[ext]",
          publicPath: "/",
        })
        .end();

      //suport react-refresh
      webpackChain.module
        .rule("compile")
        .use("babel")
        .tap((options) =>
          merge(options, {
            plugins: [require.resolve("react-refresh/babel")],
          })
        );
    }

    if (isProductionEnv()) {
      // support css-module
      webpackChain.module
        .rule("scss-module")
        .test(/\.module\.(css|sass|scss)$/)
        .use("mini-css-extract-plugin")
        .loader(MiniCssExtractPlugin.loader)
        .end()
        .use("css")
        .loader(require.resolve("css-loader"))
        .options({
          modules: true,
          localIdentName: "[name]_[local]__[hash:base64:5]",
        })
        .end()
        .use("postcss")
        .loader(require.resolve("postcss-loader"))
        .end()
        .use("scss")
        .loader(require.resolve("sass-loader"))
        .options({
          implementation: require("node-sass"),
        })
        .end()
        .end();

      webpackChain.module
        .rule("scss")
        .test(/(?<!module)\.(css|sass|scss)$/) // extract css-module
        .use("mini-css-extract-plugin")
        .loader(MiniCssExtractPlugin.loader)
        .end()
        .use("css")
        .loader(require.resolve("css-loader"))
        .end()
        .use("postcss")
        .loader(require.resolve("postcss-loader"))
        .end()
        .use("scss")
        .loader(require.resolve("sass-loader"))
        .options({
          implementation: require("node-sass"),
        })
        .end()
        .end();

      webpackChain.module
        .rule("html")
        .test(/\.html$/)
        .use("html")
        .loader(require.resolve("html-loader"))
        .options({
          attrs: ["img:src"],
        })
        .end()
        .end()
        .rule("image")
        .test(/\.(png|jpg|gif|svg|jpeg|webp)$/)
        .use("url")
        .loader(require.resolve("url-loader"))
        .options({
          limit: 10 * 1024,
          name: "img/[name].[hash:8].[ext]",
        })
        .end();
    }
  });
};
