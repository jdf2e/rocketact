---
id: available-scripts
title: Available Scripts
---

## `npm start` or `yarn start`

Start local development environment.

Once started, you will see a similar console:

![](assets/development-environment-console.png)

The port may be different depending on whether another process is using 3000 port.

In the development environment, changes made to JavaScript module and SCSS/CSS files will trigger a fully page reload automaticly.

### Commandline Options

#### `--port`

> Available since Rocketact 1.6.0

Allow developer specify a preferred port for development environment.

Corresponding environment variable: `PORT`.

For example:

```bash
yarn start -- --port 80
# or
PORT=80 yarn start
```

## `npm run build` or `yarn build`

Perform a production build.

During the production build, all text assets (JavaScript / CSS files) will be minified and hashes are added to file names for long-term caching.

All emitted assets will be saved to `build` folder.

### Commandline Options

#### `--no-hash`

> Available since Rocketact 1.5.0

This will remove the `hash` part in the filenames of a production build.

Corresponding environment variable: `NO_HASH`.

For example:

```bash
yarn build -- --no-hash
# or
NO_HASH=true yarn build
```

#### `--https`

> Available since Rocketact-Scripts 1.9.3

This supports [webpack dev server mode](https://webpack.js.org/configuration/dev-server/#devserverhttps).

Corresponding environment variable: `HTTPS`.

For example:

```bash
yarn build -- --https
# or
HTTPS=true yarn build
```

#### `--sourcemap`

> Available since Rocketact 1.10.1

This will generate sourcemap files for `*.(t|j)s` which in current project.

`Rocketact@1.x` dependencies `Webpack@4.x` and [`terser-webpack-plugin@4.2.3`](https://github.com/webpack-contrib/terser-webpack-plugin/tree/v4.2.3#sourcemap).

> terser-webpack-plugin@5.x no longer supported webpack@4. [https://github.com/webpack-contrib/terser-webpack-plugin/releases/tag/v5.0.0](https://github.com/webpack-contrib/terser-webpack-plugin/releases/tag/v5.0.0)

More Powerful ability for generating sourcemap files, please use other webpack plugins.

Corresponding environment variable: `SOURCEMAP`.

For example:

```bash
yarn build -- --sourcemap
# or
SOURCEMAP=true yarn build
``
```
