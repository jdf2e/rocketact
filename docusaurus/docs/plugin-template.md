---
id: plugin-template
title: Plugin template
---

Here is a simple plugin template:

```js
module.exports = api => {
  api.chainWebpack(webpackChain => {
    // Modify the webpack configuration to your needs
  });

  api.registerCommand("commandName", () => {
    // Implementation detail
  })
};
```