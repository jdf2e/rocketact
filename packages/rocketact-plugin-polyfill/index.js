const merge = require("babel-merge");

const polyfillsPlugin = require.resolve("./polyfillsPlugin");
const polyfill = require.resolve("./polyfill");

module.exports = api => {
  api.chainWebpack(webpackChain => {
    webpackChain.module
      .rule("compile")
      .use("babel")
      .tap(options => {
        const newOptions = {};
        Object.assign(newOptions, options, {
          plugins: [
            ...options.plugins,
            [polyfillsPlugin, { polyfills: [polyfill] }]
          ]
        });
        return newOptions;
      });
  });
};
