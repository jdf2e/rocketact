---
id: Folder Structure
title: Folder Structure
---

## Folder Structure Intro

Rocketact team has consulted create-react-app@2 (with react-script-ts), Vue-cli@3, react-boilerate, other projects with React and so on. And multi-page is a Rocetact's important feature. For aiming to develop with Rocetact easier and comfortable, let's take some minutes on the following content to know about the project folder structure which Rocetact working.

```bash
.
├── build
├── src
│   ├── api # API
│   ├── styles # ex: images 、scss
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
├── @types # typescript *.d.ts
├── README.md
├── package.json
├── tsconfig.json
└── tslint.json
```

### build

As you see, Rocketact build folder is `build` as default when you run `yarn build or npm build`. This folder contains all the files which are HTML, js (bundled), CSS and other assets.

### source code

'src' folder is source code folder. You can put your files, assets and other things what you imported and expect to bundle. There's only one rule here, 'pages' in 'src' is required. Because Rocketact will regard every '.tsx / .jsx' in 'pages' as an entry, like 'app.tsx' and 'app.html', 'index.tsx' and 'index.html'. They pair up each other and make up multi-page Application.

Other folders are recommended, but they are not a constraint. Our team consulted folder structure from many scaffolds and project which developed with React.

### config

- `package.json`
- `tsconfig.json` and `tslint.json`

### others

- components, you can put your components in here.
- styles, it may contain `.scss`, image files and other static assets.
- ...
