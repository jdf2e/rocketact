import * as fs from "fs";
import * as path from "path";
import * as execa from "execa";

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

/**
 * process 执行返回值
 */
export interface IExecaReturn {
  cmd: string;
  code: number;
  failed: boolean;
  killed: boolean;
  signal: string | null;
  stderr: string;
  stdout: string;
  timedOut: boolean;
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
  constructor() {
    // TODO: singleton
  }

  /**
   * 安装依赖
   * @param {string} packageName 依赖包名称
   * @param {string} versionOrTag 依赖包版本号或tag
   * @param {boolean} isDev 是否为开发依赖，默认 ture
   * @returns promise
   */
  public install(
    packageName?: string,
    version?: string,
    isDev = true
  ): Promise<IExecaReturn> {
    return this.processInstall(packageName, version, isDev);
  }

  /**
   * 删除依赖
   *
   * @param {string} packageName 依赖包名称
   * @returns Promise
   */
  public uninstall(packageName: string): Promise<IExecaReturn> {
    return this.processUninstall(packageName);
  }

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
      return Promise.resolve(true);
    } catch (err) {
      return Promise.resolve(false);
    }
  }

  private async processInstall(
    packageName?: string,
    versionOrTag?: string,
    isDev = true
  ): Promise<IExecaReturn> {
    const args: any = [];

    let canUseYarn = await this.hasYarn();
    const hasYarnLock = await this.hasYarnLock();

    const command = canUseYarn ? "yarn" : "npm";
    if (!packageName) {
      try {
        const result = await execa.shell(`${command} install`);
        return Promise.resolve({ ...(result as IExecaReturn) });
      } catch (error) {
        return Promise.reject({ error });
      }
    }

    canUseYarn = canUseYarn && hasYarnLock; // 本工程内以前未使用 yarn 管理

    if (canUseYarn) {
      args.push("add");
      args.push(`${packageName}${versionOrTag ? `@${versionOrTag}` : ""}`);

      args.push(isDev ? "-D" : "");

      args.push("--cwd");
      args.push(process.cwd());
    } else {
      args.push("install");
      args.push(`${packageName}${versionOrTag ? `@${versionOrTag}` : ""}`);
      args.push(isDev ? "-D" : "-P");
    }

    let runReturn: IExecaReturn;
    try {
      runReturn = execa.shellSync(`${command} ${args.join(" ")}`);
      return Promise.resolve(runReturn);
    } catch (error) {
      runReturn = { ...error };
      return Promise.reject(runReturn);
    }
  }

  private async processUninstall(packageName: string): Promise<IExecaReturn> {
    if (!packageName) {
      console.log(
        "  * Please specify the package name which you want to remove!"
      );
      return Promise.reject({});
    }

    const canUseYarn = await this.hasYarn();
    const hasYarnLock = await this.hasYarnLock();
    const command = canUseYarn && hasYarnLock ? "yarn remove" : "npm uninstall";

    let runReturn: IExecaReturn;
    try {
      runReturn = await execa.shell(`${command} ${packageName}`);
      return Promise.resolve(runReturn);
    } catch (error) {
      // yarn remove 删除一个不存在的包会报错，npm unisntall 并不会
      runReturn = { ...error };
      return Promise.reject(runReturn);
    }
  }
}

const packageUtil = new PackageUtil();

export { packageUtil };
