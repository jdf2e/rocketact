import CoreAPI from "rocketact-scripts/dist/CoreAPI";
import { infoBlock, successBlock, errorBlock } from "rocketact-dev-utils";
import { safeLoad } from "js-yaml";
import FtpDeploy from "ftp-deploy";
import fs from "fs";

// TODO: http 上传或其他方式上传部署
module.exports = (api: CoreAPI) => {
  api.registerCommand(
    "deploy",
    (): Promise<any> => {
      const publicPath =
        process.env.npm_package_publicPath || process.env.npm_package_cdn;
      if (!publicPath) {
        console.log(
          `${errorBlock(
            " ERROR "
          )} Please specify the 'publicPath' in package.json!`
        );
        return Promise.reject();
      } else {
        let deployrc = null;
        try {
          deployrc = safeLoad(
            fs.readFileSync(`${process.cwd()}/deployrc.yml`, "utf8")
          );
          if (!deployrc) {
            console.log(
              `${errorBlock(
                " ERROR "
              )} Please check the 'deployrc.yml' in your project!`
            );
            return Promise.reject();
          }
        } catch (error) {
          console.log(
            `${errorBlock(
              " ERROR "
            )} Please check the 'deployrc.yml' in your project!`
          );
          return Promise.reject();
        }

        if (deployrc.ftp) {
          /** FTP 部署 */
          const ftpDeploy = new FtpDeploy();

          const defaultFtpConfig = {
            port: 21,
            localRoot: `${process.cwd()}/build`,
            // remoteRoot: `/export/www/html${publicPath.slice(1)}/`,
            include: ["*", "**/*"],
            exclude: [],
            deleteRemote: false,
            forcePasv: true
          };

          const config = { ...defaultFtpConfig, ...deployrc.ftp };

          // server path
          config.remoteRoot = `${config.remoteDir}${publicPath.slice(1)}/`;

          console.log(
            `${infoBlock(" INFO ")} Deploying to ${deployrc.ftp.host}`
          );

          Promise.all(
            ftpDeploy
              .deploy(config)
              .then(() => {
                console.log(`${successBlock(" Success ")} Deploy finished`);
                return Promise.resolve({});
              })
              .catch((err: any) => {
                console.log(err);
                return Promise.reject({});
              })
          );
        } else {
          return Promise.reject({});
        }
        return Promise.resolve();
      }
    }
  );
};
