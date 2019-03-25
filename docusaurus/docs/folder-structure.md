---
id: Folder Structure
title: Folder Structure
---

## Basic Structure

Newly created project will contain the following folder structure:

```bash
.
├── @types               # project level type definations
│   └── images.d.ts
├── README.md            # project readme
├── package.json
├── postcss.config.js    # PostCSS configuration.
├── public               # files under this directory will be copied to build directory untouched
│   └── favicon.png
├── src                  # all your source code goes here
│   ├── pages
│   │   ├── app.html     # HTML template for this page
│   │   ├── app.scss     # page level style. not required.
│   │   └── app.tsx      # entry file for this page
│   └── styles           # gloabl styles shared by multi pages
│       └── reset.scss   # global reset style
├── tsconfig.json        # TypeScript configuration. Remove it if you don't use TypeScript
├── tslint.json          # TSLint configuration. Remove it if you do not need TSLint check
└── node_moduels/
```

## Conventions/Restrictions

Rocketact does not rely on your folder structure much. The only convention/restriction is that **entry file** and **HTML template** must have the same filename for the same page and boths resides in `src/pages/` folder.

For example, you'd like to add a new profile page, all you need to do is creating two new files:

```bash
├── src
│   ├── pages
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.tsx
│   │   ├── profile.tsx    # entry file for new page
│   │   └── profile.html   # HTML template for new page
```

Then Rocketact should be ready for the new page in both development and production environment.