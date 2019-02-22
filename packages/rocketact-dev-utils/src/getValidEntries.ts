import path from "path";
import fs from "fs";

interface IEntries {
  [key: string]: string;
}

interface IValidEntries {
  [key: string]: {
    js: string;
    html: string;
  };
}

const getEntriesByExt = (p: string, extReg: RegExp): IEntries => {
  const fullPath = path.resolve(p, "./src/pages");
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath);
    const result: IEntries = {};

    files.forEach(file => {
      if (file.match(extReg)) {
        result[path.basename(file).replace(extReg, "")] = path.resolve(
          fullPath,
          file
        );
      }
    });

    return result;
  } else {
    return {};
  }
};

const getValidEntries: (p: string) => IValidEntries = p => {
  const jsEntries = getEntriesByExt(p, /\.[tj]sx?$/);
  const htmlEntries = getEntriesByExt(p, /\.html$/);

  const result: IValidEntries = {};

  Object.keys(jsEntries).forEach(entry => {
    if (htmlEntries[entry]) {
      result[entry] = {
        js: jsEntries[entry],
        html: htmlEntries[entry]
      };
    }
  });

  return result;
};

export { getValidEntries };
