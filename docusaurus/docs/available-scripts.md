---
id: available-scripts
title: Available Scripts
---

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
