const fs = require("fs");
const path = require("path");
const execa = require("execa");

interface IPackageUtil {
  /**
   * 安装依赖
   * @param {string} packageName 依赖包名称
   * @param {string} versionOrTag 依赖包版本号或tag
   * @param {boolean} isDev 是否为开发依赖，默认 ture
   * @returns promise
   */
  install: (
    packageName?: string,
    versionOrTag?: string,
    isDev?: boolean
  ) => Promise<IExecaReturn>;
  /**
   * 删除依赖
   *
   * @param {string} packageName 依赖包名称
   * @returns Promise
   */
  uninstall: (packageName: string) => Promise<IExecaReturn>;
}

interface IExecaReturn {
  code: number;
  signal: string;
  stdout: string;
  stderr: string;
}

/**
 * 项目依赖工具类
 *
 * [NPM Install Doc](https://docs.npmjs.com/cli/install)
 *
 * [Yarn Install Doc](https://yarnpkg.com/zh-Hans/docs/usage)
 *
 * TODO: 安装过程 loading 和 emoji
 */
class PackageUtil implements IPackageUtil {
  constructor() {}

  private async hasYarn(): Promise<boolean> {
    try {
      execa.shellSync(`yarnpkg --version`, { stdio: "ignore" });
      return true;
    } catch (error) {
      return false;
    }
  }

  private async hasYarnLock(): Promise<boolean> {
    try {
      fs.accessSync(
        path.resolve(`${process.cwd()}`, "yarn.lock"),
        fs.constants.R_OK
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  private async processInstall(
    packageName?: string,
    versionOrTag?: string,
    isDev = true
  ): Promise<IExecaReturn> {
    let args: any = [];

    let canUseYarn = await this.hasYarn();
    const hasYarnLock = await this.hasYarnLock();

    let command = canUseYarn ? "yarn" : "npm";
    if (!packageName) {
      return await execa.shellSync(`${command} install`);
    }

    canUseYarn = canUseYarn && hasYarnLock; // 本工程内以前未使用yarn管理

    if (canUseYarn) {
      args.push("add");
      args.push(`${packageName}${versionOrTag ? `@${versionOrTag}` : " -E"}`); // FIXME: ？确保项目安装依赖稳定使用固定版本

      args.push(isDev ? "-D" : "");

      args.push("--cwd");
      args.push(process.cwd());
    } else {
      args.push("install");
      args.push(
        `${packageName}${versionOrTag ? `@${versionOrTag}` : " -E"}` // 精确版本
      );
      args.push(isDev ? "-D" : "-P");
    }

    let runReturn: IExecaReturn;
    try {
      runReturn = await execa.shellSync(`${command} ${args.join(" ")}`);
    } catch (error) {
      runReturn = { ...error };
    }
    return runReturn;
  }

  private async processUninstall(packageName: string): Promise<IExecaReturn> {
    if (!packageName) {
      console.log(
        "  * Please specify the package name which you want to remove!"
      );
      process.exit(1);
    }

    const canUseYarn = await this.hasYarn();
    const hasYarnLock = await this.hasYarnLock();
    const command = canUseYarn && hasYarnLock ? "yarn remove" : "npm uninstall";

    let runReturn: IExecaReturn;
    try {
      runReturn = await execa.shellSync(`${command} ${packageName}`);
    } catch (error) {
      // yarn remove 删除一个不存在的包会报错，npm unisntall 并不会
      runReturn = { ...error };
    }

    return runReturn;
  }

  public install(
    packageName?: string,
    version?: string,
    isDev = true
  ): Promise<IExecaReturn> {
    return this.processInstall(packageName, version, isDev);
  }

  public uninstall(packageName: string): Promise<IExecaReturn> {
    return this.processUninstall(packageName);
  }
}

const packageUtil = new PackageUtil();

export { packageUtil };
