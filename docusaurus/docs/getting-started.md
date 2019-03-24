---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

Rocketact is a tool that helps you focusing on your code without caring about environment setup or build process configuration. You can start developing a single-page React application or multi-page React application with zero configuration.

## Why Not Using Create React App?

[Create React App](https://facebook.github.io/create-react-app/) **is a great tool** for creating React applications. We have been using it for many internal projects at [JD.com](https://jd.com). But we also found some limitations of CRA in our use case. For example, we can't modify the builtin Webpack configuration in an easy way; we can't use it for a multi-page React application. So we tried to make a similar tool but with more flexibility in both configuration and usage scenario.

Again, [Create React App](https://facebook.github.io/create-react-app/) **is a great tool** for creating React application and has better community support. You should start with CRA until you know what you really need.

## Quick Start

```bash
npx rocketact create my-awesome-app
cd my-awesome-app
npm start
```

npx comes with [npm 5.2+](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner) and higher version. If you are using an older version npm, you can use Rocketact in the following way:

```bash
npm install -g rocketact
rocketact create my-awesome-app
cd my-awesome-app
npm start
```

Then open [http://localhost:3000](http://localhost:3000) to see your app.

## Environment Requirement

Rocketact requires **Node >= 8**. You can use [nvm](https://github.com/creationix/nvm) (for Mac/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows) to switch between different Node versions on your local machine.

## Builtin Scripts

### `npm start` or `yarn start`

Start local development environment.

Once started, you will see a similar console:

![](assets/development-environment-console.png)

The port may be different depending on whether another process is using 3000 port.

In the development environment, changes made to JavaScript module and SCSS/CSS files will trigger a fully page reload automaticly.

### `npm run build` or `yarn build`

Perform a production build.

During the production build, all text assets (JavaScript / CSS files) will be minified and hashes are added to file names for long-term caching.

All emitted assets will be saved to `build` folder.