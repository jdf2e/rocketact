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
    const result: IEntries = {};
    const filesWithDir = fs.readdirSync(fullPath, { withFileTypes: true });

    filesWithDir.forEach((file) => {
      if (file.isDirectory()) {
        const filesDir = fs.readdirSync(
          path.resolve(p, "./src/pages", file.name)
        );
        filesDir.forEach((fileItem) => {
          if (fileItem.match(extReg)) {
            result[
              `${file.name}/${path.basename(fileItem).replace(extReg, "")}`
            ] = path.resolve(fullPath, file.name, fileItem);
          }
        });
        // return getEntriesByExt(p, extReg, "./src/pages/" + file.name);
        // TODO: 递归
      } else {
        if (file.name.match(extReg)) {
          result[file.name.replace(extReg, "")] = path.resolve(
            fullPath,
            file.name
          );
        }
      }
    });

    return result;
  } else {
    return {};
  }
};

const getValidEntries: (p: string) => IValidEntries = (p) => {
  const jsEntries = getEntriesByExt(p, /\.[tj]sx?$/);
  const htmlEntries = getEntriesByExt(p, /\.html$/);

  const result: IValidEntries = {};

  Object.keys(jsEntries).forEach((entry) => {
    if (htmlEntries[entry]) {
      result[entry] = {
        js: jsEntries[entry],
        html: htmlEntries[entry],
      };
    }
  });

  return result;
};

export { getValidEntries };
