const fs = require("fs");
const path = require("path");

const createHtmlWebpackPluginInstance = require("rocketact-scripts/dist/utils/createHtmlWebpackPluginInstance")
  .default;

const { resolveToAppRoot } = require("rocketact-dev-utils");

module.exports = api => {
  const jsEntries = {};
  fs.readdirSync(resolveToAppRoot("./src/js/pages"))
    .filter(p => p.match(/\.[tj]sx?$/))
    .map(p => path.join(resolveToAppRoot("./src/js/pages"), p))
    .forEach(p => {
      const entryName = path.basename(p).replace(/\.[tj]sx?$/, "");
      jsEntries[entryName] = p;
    });

  const htmlEntries = {};
  fs.readdirSync(resolveToAppRoot("./src/html"))
    .filter(p => p.match(/\.html$/))
    .map(p => path.join(resolveToAppRoot("./src/html"), p))
    .forEach(p => {
      const entryName = path.basename(p).replace(/\.html$/, "");
      htmlEntries[entryName] = p;
    });
console.log(jsEntries)
  api.chainWebpack(webpackChain => {
    // clear default entries and HtmlWebpackPlugin instances
    webpackChain.entryPoints.clear();

    Object.keys(webpackChain.plugins.entries()).forEach(pluginName => {
      if (pluginName.match(/^HtmlWebpackPlugin\-/)) {
        webpackChain.plugins.delete(pluginName);
      }
    });

    // add entries and HtmlWebpackPlugin instances
    Object.keys(jsEntries).forEach(entryName => {
      if (htmlEntries[entryName]) {
        webpackChain.entry(entryName).add(jsEntries[entryName]);

        webpackChain.plugin(`HtmlWebpackPlugin-${entryName}`).use(
          ...createHtmlWebpackPluginInstance({
            entryName,
            template: htmlEntries[entryName]
          })
        );
      }
    });
  });
};
