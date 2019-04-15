---
id: what-is-the-plugin
title: What is the plugin?
---

Rocketact leverages various plugins to implements various features. You can think of plugins as the "API" to modify Rocketact's behaviour.

## How Rocketact works?

Rocketact at its core leverages [webpack](https://webpack.js.org/) and [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to handle the bundle operation and development environment. We use [webpack-chain](https://github.com/neutrinojs/webpack-chain) to simplify the management of webpack's configuration.

Rocketact use plugin APIs internally to [create builtin commands](https://github.com/jdf2e/rocketact/tree/master/packages/rocketact-scripts/src/commands) and [compose webpack configurations](https://github.com/jdf2e/rocketact/tree/master/packages/rocketact-scripts/src/config/webpack).

## How plugins works?

The plugin interface contains three API:

### api.registerCommand(subcommand: string, () => Promise\<any\>): void

Register a new sub-command. Then you can run:

```bash
npx rocketact-scripts subcommand
```

or configure it in npm scripts.

The second argument is called without parameters.

### api.resolveWebpackConfig(): webpack.Configuration

Returns a plain webpack configuration object.

### api.chainWebpack((webpackChain: Config) => void)

Use this API to manipulate the default webpack configuration in Rocketact.

## How to use a plugin?

### Local plugin

Basiclly, every JavaScript file could be a valid plugin, all you need to do is make sure its exports object is a function accepts the `plugin interface API` as parameter.

Following is a simple example showing how to configure `babel-plugin-import` for `antd`:

Create a file named `rocketactPlugin.js` in your project's root folder with following content:

```js
const merge = require("babel-merge");

module.exports = api => {
  api.chainWebpack(webpackChain => {
    webpackChain.module
      .rule("compile")
      .use("babel")
      .tap(options =>
        merge(options, {
          plugins: [[require.resolve("babel-plugin-import"), {
            "libraryName": "antd",
            "style": "css"
          }]]
        })
      );
  });
};
```

Then tell Rocketact to load that file by adding a new `rocketactPlugins` filed in `package.json`:

```json
  "rocketactPlugins": [
    "./rocketactPlugin"
  ]
```

### Installed plugin

If you want to share your plugin with other developers. The best way to achieve this is to publish your plugin as a npm package. 

The only restriction is the package name must follow the `rocketact-plugin-` prefix.

All the plugin users need to do is install it as a dev dependency and no other configuration is needed.