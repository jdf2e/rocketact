import * as fs from "fs";
import * as path from "path";

const execa = require("execa");
const getStream = require("get-stream");

interface IPackageUtil {
  /**
   * 安装依赖
   * @param {string} packageName 依赖包名称
   * @param {IInstallOpts} opts 安装依赖选项
   * @returns promise
   */
  install: (
    packageName?: string,
    opts?: IInstallOpts | undefined
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

export interface IInstallOpts {
  /** 版本或tag */
  versionOrTag?: string;
  /** 是否为开发依赖，默认 false */
  isDev?: boolean;
}

/**
 * 项目依赖工具类
 *
 * - install
 * - uninstall
 *
 * [NPM Install Doc](https://docs.npmjs.com/cli/install)
 *
 * [Yarn Install Doc](https://yarnpkg.com/zh-Hans/docs/usage)
 *
 * TODO: 安装过程 loading 和 emoji、名称的校验、版本或tag的提前校验，目前都交给yarn和npm安装异常抛出错误
 *
 * @returns {Promise} process msg
 */
class PackageUtil implements IPackageUtil {
  /**
   * 安装依赖
   * @param {string} packageName 依赖包名称
   * @param {IInstallOpts} opts 安装依赖选项
   * @returns promise
   */
  public install(
    packageName?: string,
    opts?: IInstallOpts
  ): Promise<IExecaReturn> {
    return this.processInstall(packageName, opts);
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
    opts?: IInstallOpts
  ): Promise<IExecaReturn> {
    const args: any = [];

    /** 拥有 yarn 环境 */
    const hasYarn = await this.hasYarn();
    /** 本地有 yarn.lock 文件 */
    const hasYarnLock = await this.hasYarnLock();

    if (!packageName) {
      // 初次初始化安装，优先使用 yarn 安装
      try {
        const result = execa(`${hasYarn ? "yarn" : "npm"}`, ["install"]);
        const stream = result.stdout;
        stream.pipe(process.stdout);

        return getStream(stream).then(() => {
          return Promise.resolve({ ...result });
        });
      } catch (error) {
        return Promise.reject({ error });
      }
    } else {
      // 非首次安装
      const canUseYarn = hasYarn && hasYarnLock;
      const command = canUseYarn ? "yarn" : "npm";

      if (canUseYarn) {
        args.push("add");
        args.push(
          `${packageName}${
            opts && opts.versionOrTag ? `@${opts.versionOrTag}` : ""
          }`
        );

        args.push(opts && opts.isDev ? "--save-dev" : "--save");

        args.push("--cwd");
        args.push(process.cwd());
      } else {
        args.push("install");
        args.push(
          `${packageName}${
            opts && opts.versionOrTag ? `@${opts.versionOrTag}` : ""
          }`
        );
        args.push(opts && opts.isDev ? "--save-dev" : "--save");
      }

      try {
        const result = execa(`${command}`, args);
        const stream = result.stdout;
        stream.pipe(process.stdout);

        return await getStream(stream).then(() => {
          return Promise.resolve({ ...result });
        });
      } catch (error) {
        return Promise.reject({ ...error });
      }
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
      runReturn = await execa(`${command} ${packageName}`);
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
