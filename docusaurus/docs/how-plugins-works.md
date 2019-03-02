---
id: how-plugins-works
title: How plugins works?
---

There are some `built-in` and `installed` plugins in Rocketact. They work in different ways for helping enhance Rocketact's capacity.

You might wonder how those `plugins` works (I'm pretending you're curious : P). We hope `some plugins` will become `many plugins` with your contribution after knowing how they work with us.

Okay, Let's get back to the main point of this section.

## APIs

There's following APIs for every plugin:

- `chainWebpack`
- `registerCommand`
- `resolveWebpackConfig`

### chainWebpack

Rocketact is powered by Webpack@4 . So plugin can get an object of the
Webpack-chain. You can use its API to generate and simplify the modification of Webpack. That may offer help to your project on the particular part.

### registerCommand

### resolveWebpackConfig

Using this API, you can get the completed configuration object to be consumed by Webpack. We implement that with webpack-chain `toConfig()` to export that.

- [webpack-chain](https://github.com/neutrinojs/webpack-chain)
