# {{ projectName }}

## Start

```bash
npm run start
// or
yarn run start
```

## Build

```bash
npm run build
// or
yarn run build
```

## Project Template Descrption

### File Architecture

```
.
├── build
├── node_modules
├── public
├── src
│   ├── api # API
│   ├── assets # ex: images 、scss
│   │   ├── images
│   │   ├── common.scss
│   │   └── reset.scss
│   ├── components
│   │   └── CommonHeader # ex：common header component
│   │       ├── CommmonHeader.tsx
│   │       ├── index.ts
│   │       └── style.scss
│   ├── pages
│   │   ├── app.html # pages app
│   │   ├── app.scss
│   │   ├── app.tsx
│   │   ├── home.html # page home
│   │   ├── home.scss
│   │   └── home.tsx
│   └── utils
├── .editorconfig
├── .prettierrc
├── README.md
├── package.json
├── tsconfig.json
├── tslint.json
└── yarn.lock
```
