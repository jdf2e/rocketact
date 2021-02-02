---
id: custom-templates
title: Custom Templates
---

> Available since rocketact@0.3.3

### Find custom templates

You can find many other templates by searching for ["rocketact-template-*"](https://www.npmjs.com/search?q=rocketact-template) on npm.

### How to build a custom template

Here some rules you may follow.

#### Folder Structure

Custom template's fold structure may like this [Folder Structure#conventionsrestrictions](Folder%20Structure#conventionsrestrictions).

ex. ``rocketact-template-default``

```shell
.
├── @types
│   └── images.d.ts
├── public
│   └── favicon.png
├── src
│   ├── components
│   │   └── Welcome
│   │       ├── Welcome.scss
│   │       ├── Welcome.tsx
│   │       ├── index.ts
│   │       └── logo.svg
│   ├── pages
│   │   ├── app.html
│   │   ├── app.scss
│   │   └── app.tsx
│   └── styles
│       └── reset.scss
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── README.md
├── package.json
├── postcss.config.js
└── tsconfig.json
```

#### Name Definition Rule

Make sure that package.json's name is starting with ``rocketact-template-``.

ex. ``package.json``

```json5
{
  "name": "rocketact-template-custom",
  "version": "0.1.0",
  "main": "index.js",
  "publicPath": "/",
  "scripts": {
    "start": "rocketact-scripts start",
    "build": "rocketact-scripts build",
    "lint": "eslint 'src/**/*.{js,ts,tsx}' --quiet --fix"
  },
  "repository": {
    "type": "git",
    "url": "git repo url"
  },
  "author": "author <author@rocketact.com>",
  "license": "ISC",
  "browserslist": [
  ],
  "devDependencies": {
    // ... ignore
  },
  "dependencies": {
    // ... ignore
  }
}
```

```shell
npm publish .
```

#### Done

Now, you just released a custom template of rocketact.

#### Install into your project

```shell
npx rocketact create my-awsome-app --template custom
```
#### Install with version

Rocketact supports installing a template with a assign version.

```shell
npx rocketact create my-awsome-app --template custom@1.0.1
```

### Constribute

Welcome all Rocketact's users to contribute custom template for your project or team.

Npm search link: [rocketact-template-*](https://www.npmjs.com/search?q=rocketact-template).

[Rocketact Contribute Guide](https://github.com/jdf2e/rocketact/blob/master/CONTRIBUTING.md)