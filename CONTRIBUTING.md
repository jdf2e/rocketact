## How to contribute to Rocketact

### Do you find a bug?

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/jdf2e/rocketact/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/jdf2e/rocketact/issues/new/choose). **Be sure to include a title and clear description, as much relevant information as possible.**

### Do you want to contribute to the source code?

Use Node >= 10 version as **development environment**.

#### Prepare workspace

```bash
git clone https://github.com/jdf2e/rocketact.git
cd rocketact
yarn && yarn bootstrap
cd packages/rocketact-scripts/test/fixture/simple/ && yarn && cd -
```

#### Build

```bash
yarn build
# or build a specific package
yarn build -- --scope rockeatct
```

#### Running tests

```bash
yarn test
# or start watch mode
yarn test -- --watch
```

#### Commit changes

```bash
yarn commit
```

### Do you want to contribute to the Rocketact documentation?

Rocketact uses [Docusaurus](https://docusaurus.io/) to maintain its [documentation](https://rocketact.js.org).

If you want to preview the website locally, you can:

```bash
cd docusaurus/website
yarn
yarn start
```

Changes made to the documentation files will be reloaded into browser.

-----
<p align="center">❤️❤️❤️ Thanks! ❤️❤️❤️</p>