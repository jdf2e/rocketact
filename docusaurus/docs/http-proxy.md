---
id: http-proxy
title: Http proxy
---

## How to use devServer.proxy in Rocketact？

The reference mode of custom proxy configuration is similar to that of custom plugin. You can create one in the root folder of the project`rocketactProxy.js`File, which exports objects that act directly on`devServer.proxy`Configuration, which fully follows`devServer.proxy`The content can be in the following format:

```jsx
module.exports = {
  "/api": {
    target: "http://localhost:3000",
    changeOrigin: true,
  },
};
```

And then through the package.json Add a new configuration "rocketactproxy" and tell rocketact to load the file:

```jsx
 "rocketactProxy": "./rocketactProxy.js"
```
