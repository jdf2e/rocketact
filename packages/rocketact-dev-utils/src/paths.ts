import path from "path";
import fs from "fs";

const appRoot = () => fs.realpathSync(process.cwd());

const resolveToAppRoot = (p: string) => path.resolve(appRoot(), p);

const appSrc = () => resolveToAppRoot("src");
const appBuild = () => resolveToAppRoot("build");
const appPackageJson = () => resolveToAppRoot("package.json");

export { resolveToAppRoot, appSrc, appBuild, appPackageJson, appRoot };
