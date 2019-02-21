# Rocketact
🚀 Developing React projects with ease

<p align="left">
  <a href="https://travis-ci.org/jdf2e/rocketact/builds"><img alt="Build Status" src="https://travis-ci.org/jdf2e/rocketact.svg?branch=master"></a>  
  <a href="https://www.npmjs.com/package/rocketact"><img alt="npm Downloads" src="https://img.shields.io/npm/dm/rocketact.svg"></a>
  <a href="http://makeapullrequest.com"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"></a>
</p>

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
yarn bootstrap
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