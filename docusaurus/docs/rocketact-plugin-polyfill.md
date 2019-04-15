---
id: rocketact-plugin-polyfill
title: rocketact-plugin-polyfill
---

Automaticlly include polyfills for Rocketact projects.

Following language features / browser API are included:

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) / [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)


## How to use it?

Simply install `rocketact-plugin-polyfill` as dev dependency:

```bash
yarn add -D rocketact-plugin-polyfill
# or
npm install --save-dev rocketact-plugin-polyfill
```

And all those polyfills will be automaticlly included in your bundle. No need to modify your code.