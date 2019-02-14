const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { isProductionEnv } = require("rocketact-scripts/dist/utils/environment");

module.exports = api => {
  api.chainWebpack(webpackChain => {
    if (isProductionEnv()) {
      webpackChain.plugin("WebpackBundleAnalyzer").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
          reportFilename: "bundleAnalyzerReport.html",
          openAnalyzer: false
        }
      ]);
    }
  });
};
