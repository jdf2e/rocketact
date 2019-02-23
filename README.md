# Rocketact
🚀 Developing React projects with ease

<p align="left">
  <a href="https://travis-ci.org/jdf2e/rocketact/builds"><img alt="Build Status" src="https://travis-ci.org/jdf2e/rocketact.svg?branch=master"></a>
  <a href="https://www.npmjs.com/package/rocketact"><img alt="node" src="https://img.shields.io/node/v/rocketact.svg"></a>
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


## Development

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