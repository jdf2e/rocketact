<p align="center">
  <a href="#">
    <img alt="rocketact" src="./logo.png">
  </a>
</p>

<p align="center">🚀 Developing React projects with ease</p>

<p align="center">
  <a href="https://travis-ci.org/jdf2e/rocketact/builds"><img alt="Build Status" src="https://travis-ci.org/jdf2e/rocketact.svg?branch=master"></a>
  <a href="https://www.npmjs.com/package/rocketact"><img alt="node" src="https://img.shields.io/node/v/rocketact.svg"></a>
</p>
<p align="center">
  <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-scripts&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-scripts"></a>
  <a href="https://codeclimate.com/github/jdf2e/rocketact"><img alt="Maintainability" src="https://img.shields.io/codeclimate/maintainability/jdf2e/rocketact.svg"></a>
  <a href="https://www.npmjs.com/package/rocketact"><img alt="npm Downloads" src="https://img.shields.io/npm/dm/rocketact.svg"></a>
  <a href="http://makeapullrequest.com"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"></a>
</p>
## Features

- ⚡️ Zero configuration
- 👏 Supports both Single-Page Application and Multi-Page Application
- 📤 Supports [TypeScript](https://www.typescriptlang.org/)、[Sass](https://sass-lang.com/)、[PostCSS](https://postcss.org/) out of box
- 🖥 Full-featured web console
- 🕹 Fully control over every step of the build process

## Usage

With [`npx`](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner), you can run:

```bash
npx rocketact create my-awesome-project
```

Or you can install `rocketact` globaly:

```bash
npm install -g rocketact
rocketact create my-awesome-project
```

then you can:

```bash
cd my-awesome-project
npm start
// or
yarn start
```

## Packages


| Name  | Description | Meta |
|---|---|---|
| rocketact  | commandline tool to create new projects  |   <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact"></a>  |
| rocketact-scripts | main functionality resides here |   <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-scripts&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-scripts"></a>  |
|  rocketact-dev-utils | common utils shared by other packages |    <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-dev-utils&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-dev-utils"></a> |
|  rocketact-web-console | web console core |   <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-web-console&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-web-console"></a>  |
|  rocketact-plugin-polyfill | automatically setup polyfill configuration |   <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-plugin-polyfill&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-plugin-polyfill"></a>  |
|  rocketact-plugin-bundle-analyzer | add [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) intergation for Rocketact projects |   <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-plugin-bundle-analyzer&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-plugin-bundle-analyzer"></a>  |
|  rocketact-plugin-butler | add compatibility for legacy Butler projects |    <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-plugin-butler&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-plugin-butler"></a> |

## Development

Use Node >= 10 version as **development environment**.

### Prepare

```bash
git clone https://github.com/jdf2e/rocketact.git
cd rocketact
yarn && yarn bootstrap
cd packages/rocketact-scripts/test/fixture/simple/ && yarn && cd -
```

### Build

```bash
yarn build
```

### Testing

```bash
yarn test
```

While developing, you can start `jest` in watch mode:

```bash
yarn test -- --watch
```

### Commit Changes

```bash
yarn commit
```