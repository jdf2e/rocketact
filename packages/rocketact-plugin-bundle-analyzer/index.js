const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {isProductionEnv} = require("rocketact-scripts/dist/utils/environment");

module.exports = api => {
  if (isProductionEnv()) {
    api.chainWebpack(webpackChain => {
      webpackChain.plugin('WebpackBundleAnalyzer').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
        reportFilename: 'bundleAnalyzerReport.html',
        openAnalyzer: false
      }])
    })
  }
}