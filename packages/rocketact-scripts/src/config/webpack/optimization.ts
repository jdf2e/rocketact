const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    if (isProductionEnv()) {
      webpackChain.optimization
        .splitChunks({
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "initial"
            }
          }
        })
        .minimizer("script")
        .use(UglifyJsPlugin, [
          {
            cache: true,
            parallel: true,
            uglifyOptions: {
              ecma: 5,
              mangle: true,
              compress: {
                drop_console: true,
                // Disable reduce_funcs for https://github.com/jdf2e/rocketact/issues/29
                reduce_funcs: false
              }
            },
            sourceMap: false // FIXME: support source map from option
          }
        ])
        .end()
        .minimizer("css")
        .use(OptimizeCSSAssetsPlugin, [
          {
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: {
              reduceIdents: false,
              mergeIdents: false,
              discardUnused: false,
              autoprefixer: false,
              zindex: false,
              map: false // FIXME: support source map from option
            }
          }
        ])
        .end();
    }
  });
};
