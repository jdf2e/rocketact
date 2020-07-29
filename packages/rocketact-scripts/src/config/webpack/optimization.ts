const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

import CoreAPI from "../../CoreAPI";

import { isProductionEnv, isDevelopmentEnv } from "../../utils/environment";
export default (api: CoreAPI) => {
  api.chainWebpack((webpackChain) => {
    if (isProductionEnv()) {
      webpackChain.optimization
        .splitChunks({
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "initial",
            },
          },
        })
        .minimizer("terser")
        .use(TerserPlugin, [
          {
            sourceMap: false,
            extractComments: false,
          },
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
              map: false, // FIXME: support source map from option
            },
          },
        ])
        .end();
    }
  });
};
