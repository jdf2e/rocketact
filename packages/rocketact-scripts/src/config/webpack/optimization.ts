const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    if (isProductionEnv()) {
      webpackChain.optimization
        .minimizer(
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              ecma: 5,
              mangle: true,
              compress: {
                drop_console: true
              }
            },
            sourceMap: false
          })
        )
        .minimizer(
          new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano, // 默认使用 cssnano 这个处理 css，看了一个 clean-css 的方案，4.2 版本才可用，以后再说
            cssProcessorOptions: {
              reduceIdents: false,
              mergeIdents: false,
              discardUnused: false,
              autoprefixer: false,
              zindex: false,
              map: false
            }
          })
        )
        .end();
    }
  });
};
