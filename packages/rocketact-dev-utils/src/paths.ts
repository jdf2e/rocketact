import path from "path";
import fs from "fs";

const R = require("ramda");

interface IEntries {
  [key: string]: string;
}

const appRoot = fs.realpathSync(process.cwd());

const resolveToAppRoot = (p: string) => path.resolve(appRoot, p);

const getJsEntries: (p: string) => IEntries = R.pipe(
  R.flip(R.nAry(2, path.resolve))("./src/js/pages/"),
  fs.readdirSync,
  R.filter(R.test(/\.[tj]sx?$/)),
  R.converge(R.zipObj, [
    R.pipe(
      path.basename,
      R.replace(/\.[tj]sx?$/, "")
    ),
    R.identity
  ])
);

const getHtmlEntries: (p: string) => IEntries = R.pipe(
  R.flip(R.nAry(2, path.resolve))("./src/html/"),
  fs.readdirSync,
  R.filter(R.test(/\.html$/)),
  R.converge(R.zipObj, [
    R.pipe(
      path.basename,
      R.replace(/\.html$/, "")
    ),
    R.identity
  ])
);

const getValidEntries: (p: string) => IEntries = p => {
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
