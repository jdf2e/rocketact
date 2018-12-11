const autoprefixer = require("autoprefixer");
const postcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

import path from "path";

import CoreAPI from "../../CoreAPI";

import { isDevelopmentEnv, isProductionEnv } from "../../utils/environment";

import { getValidEntries, appRoot, appSrc } from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    webpackChain.module
      .rule("font")
      .test(/\.(ttf|eot|woff|woff2)$/)
      .use("file")
      .loader(require.resolve("file-loader"))
      .options({
        name: "css/fonts/[name].[ext]"
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
        plugins: [
          require(path.join(
            process.cwd(),
            "./node_modules/",
            "react-hot-loader/babel"
          ))
        ]
      })
      .end()
      .end()
      .end();

    if (isDevelopmentEnv()) {
      webpackChain.module
        .rule("scss")
        .test(/\.(css|sass|scss)$/)
        .use("style")
        .loader(require.resolve("style-loader"))
        .options({
          sourceMap: true
        })
        .end()
        .use("css")
        .loader(require.resolve("css-loader"))
        .options({
          sourceMap: true
        })
        .end()
        .use("postcss")
        .loader(require.resolve("postcss-loader"))
        .options({
          sourceMap: true,
          ident: "postcss",
          plugins: () => [
            postcssFlexbugsFixes,
            autoprefixer({
              flexbox: "no-2009"
            })
          ]
        })
        .end()
        .use("scss")
        .loader(require.resolve("sass-loader"))
        .options({
          sourceMap: true,
          outputStyle: "compressed"
        })
        .end()
        .end()
        .rule("image")
        .test(/\.(png|jpg|gif|svg|jpeg|webp)$/)
        .use("file")
        .loader(require.resolve("file-loader"))
        .options({
          name: "css/i/[name].[hash:8].[ext]",
          publicPath: "/"
        })
        .end();
    }

    if (isProductionEnv()) {
      webpackChain.module
        .rule("scss")
        .test(/\.(css|sass|scss)$/)
        .use("mini-css-extract-plugin")
        .loader(MiniCssExtractPlugin.loader)
        .end()
        .use("css")
        .loader(require.resolve("css-loader"))
        .end()
        .use("postcss")
        .loader(require.resolve("postcss-loader"))
        .options({
          ident: "postcss",
          plugins: () => [
            postcssFlexbugsFixes,
            autoprefixer({
              flexbox: "no-2009"
            })
          ]
        })
        .end()
        .use("scss")
        .loader(require.resolve("sass-loader"))
        .end()
        .end();

      webpackChain.module
        .rule("html")
        .test(/\.html$/)
        .use("html")
        .loader(require.resolve("html-loader"))
        .options({
          attrs: ["img:src"]
        })
        .end()
        .end()
        .rule("image")
        .test(/\.(png|jpg|gif|svg|jpeg|webp)$/)
        .use("url")
        .loader(require.resolve("url-loader"))
        .options({
          limit: 10 * 1024,
          name: "css/i/[name].[hash:8].[ext]"
        })
        .end();
    }
  });
};
