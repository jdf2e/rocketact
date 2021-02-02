<p align="center">
  <a href="#">
    <img alt="rocketact" src="./logo.png">
  </a>
</p>

<p align="center">🚀 Developing React projects with ease</p>

<p align="center">
  <a href="https://travis-ci.org/jdf2e/rocketact/builds"><img alt="Build Status" src="https://travis-ci.org/jdf2e/rocketact.svg?branch=master"></a>
  <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-scripts&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-scripts"></a>
  <a href="https://www.npmjs.com/package/rocketact"><img alt="node" src="https://img.shields.io/node/v/rocketact.svg"></a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/rocketact-scripts"><img alt="npm Downloads" src="https://img.shields.io/npm/dm/rocketact-scripts.svg"></a>
  <a href="https://github.com/jdf2e/rocketact/issues"><img alt="issues open" src="https://img.shields.io/github/issues/jdf2e/rocketact.svg"></a>
  <a href="https://github.com/jdf2e/rocketact/issues?q=is%3Aissue+is%3Aclosed"><img alt="issues closed" src="https://img.shields.io/github/issues-closed/jdf2e/rocketact.svg"></a>
  <a href="https://github.com/jdf2e/rocketact/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/jdf2e/rocketact.svg"></a>
  <a href="http://makeapullrequest.com"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"></a>
</p>

## Features

- ⚡️ Zero configuration
- 👏 Supports both Single-Page Application and Multi-Page Application
- 📤 Supports [TypeScript](https://www.typescriptlang.org/)、[Sass](https://sass-lang.com/)、[PostCSS](https://postcss.org/) out of box
- 🖥 Full-featured web console
- 🕹 Fully control over every step of the build process
- 🔌 Supports [Yarn Plug'n'Play](https://yarnpkg.com/lang/en/docs/pnp/) environment
- 💈 Supports Custom Template

## Usage

With [`npx`](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner), run:

```bash
npx rocketact create my-awesome-project
```

Or you can install `rocketact` globaly:

```bash
npm install -g rocketact
rocketact create my-awesome-project
cd my-awesome-project
```

More info please refer to [Rocketact website](https://rocketact.js.org/).

### Available Scripts

#### Start

> Start local development environment

```bash
yarn start
# or
npm start
```

#### Build

> Perform a production build

```bash
yarn build
# or
npm run build
```

## Packages

| Name                               | Description                                                                                                                  | Meta                                                                                                                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rocketact                          | commandline tool to create new projects                                                                                      | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact"></a>                                                   |
| rocketact-scripts                  | main functionality resides here                                                                                              | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-scripts&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-scripts"></a>                                   |
| rocketact-dev-utils                | common utils shared by other packages                                                                                        | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-dev-utils&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-dev-utils"></a>                               |
| rocketact-web-console              | web console core                                                                                                             | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-web-console&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-web-console"></a>                           |
| babel-preset-rocketact             | babel presets for Rocketact projects                                                                                         | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Fbabel-preset-rocketact&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Fbabel-preset-rocketact"></a>                         |
| rocketact-plugin-polyfill          | automatically setup polyfill configuration                                                                                   | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-plugin-polyfill&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-plugin-polyfill"></a>                   |
| rocketact-plugin-bundle-analyzer   | add [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) intergation for Rocketact projects | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-plugin-bundle-analyzer&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-plugin-bundle-analyzer"></a>     |
| rocketact-plugin-legacy-decorators | add legacy decorators support for Rocketact projects                                                                         | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-plugin-legacy-decorators&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-plugin-legacy-decorators"></a> |
| rocketact-plugin-butler            | add compatibility for legacy Butler projects                                                                                 | <a href="https://david-dm.org/jdf2e/rocketact?path=packages%2Frocketact-plugin-butler&view=list"><img alt="David (path)" src="https://img.shields.io/david/jdf2e/rocketact.svg?path=packages%2Frocketact-plugin-butler"></a>                       |

## Awesome Plugins

| Name                                                                                                       | Description                                                      |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [rocketact-plugin-yep-react](https://www.npmjs.com/package/rocketact-plugin-yep-react)                     | support [yep-react](https://yep-react.jd.com/) ui components lib |
| [rocketact-plugin-icons-react](https://www.npmjs.com/package/rocketact-plugin-icons-react)                 | support @jdcfe/icons-react use svg                               |
| [rocketact-plugin-bundle-with-banner](https://www.npmjs.com/package/rocketact-plugin-bundle-with-banner)   | bundle with banner                                               |
| [rocketact-plugin-bundle-with-version](https://www.npmjs.com/package/rocketact-plugin-bundle-with-version) | bundle with version which in package.json                        |
| [rocketact-plugin-jdc-practices](https://www.npmjs.com/package/rocketact-plugin-jdc-practices)             | jdc fe team practices                                            |

Thanks for contributing these awesome plugins, you can find more plugins from npm [query link](https://www.npmjs.com/search?q=rocketact-plugin).

## Contributing

Please read our [contributing guide](https://github.com/jdf2e/rocketact/blob/master/CONTRIBUTING.md).
