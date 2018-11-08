import path from "path";
import fs from "fs";

const R = require("ramda");

interface IEntries {
  [key: string]: string;
}

interface IValidEntries {
  [key: string]: {
    js: string;
    html: string;
  };
}

const appRoot = fs.realpathSync(process.cwd());

const resolveToAppRoot = (p: string) => path.resolve(appRoot, p);

const getJsEntries = (p: string): IEntries => {
  return R.pipe(
    R.flip(R.nAry(2, path.resolve))("./src/js/pages/"),
    fs.readdirSync,
    R.map(R.curry(R.nAry(3, path.resolve))(p, "./src/js/pages")),
    R.filter(R.test(/\.[tj]sx?$/)),
    R.converge(R.zipObj, [
      R.map(
        R.pipe(
          path.basename,
          R.replace(/\.[tj]sx?$/, "")
        )
      ),
      R.identity
    ])
  )(p);
};

const getHtmlEntries = (p: string): IEntries => {
  return R.pipe(
    R.flip(R.nAry(2, path.resolve))("./src/html/"),
    fs.readdirSync,
    R.map(R.curry(R.nAry(3, path.resolve))(p, "./src/html")),
    R.filter(R.test(/\.html$/)),
    R.converge(R.zipObj, [
      R.map(
        R.pipe(
          path.basename,
          R.replace(/\.html$/, "")
        )
      ),
      R.identity
    ])
  )(p);
};

const getValidEntries: (p: string) => IValidEntries = p => {
  const jsEntries = getJsEntries(p);
  const htmlEntries = getHtmlEntries(p);
  return R.fromPairs(
    R.map(
      (entryName: string) => [
        entryName,
        { js: jsEntries[entryName], html: htmlEntries[entryName] }
      ],
      R.intersection(R.keys(jsEntries), R.keys(htmlEntries))
    )
  );
};

export { resolveToAppRoot, getValidEntries };
