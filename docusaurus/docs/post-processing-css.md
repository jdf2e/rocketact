---
id: post-processing-css
title: Post-Processing CSS
---

Vender prefixes are automatically add during build through [Autoprefixer](https://github.com/postcss/autoprefixer).

For example, this:

```css
.App {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

becomes this after build:

```css
.App {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
```

To configure the target browser list, you can adjust the `browserslist` field in `package.json`.

[Check here](https://github.com/browserslist/browserslist#readme) for a list of all supported query syntax.