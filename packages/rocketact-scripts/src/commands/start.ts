import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import detectPort from "detect-port";

import {
  error,
  success,
  clearConsole,
  infoBlock,
  info
} from "rocketact-dev-utils";

import CoreAPI from "../CoreAPI";
const webConsole = require("rocketact-web-console").default;

export default (api: CoreAPI) => {
  api.registerCommand(
    "start",
    (): Promise<any> => {
      process.env.NODE_ENV = "development";

      return new Promise((resolve, reject) => {
        const webpackConfig = api.resolveWebpackConfig();
        const devServerOptions: WebpackDevServer.Configuration = {
          disableHostCheck: true,
          overlay: true,
          hot: true,
          host: "127.0.0.1",
          publicPath: "/",
          // contentBase: ['./src/html', './src'],
          quiet: true,
          stats: {
            colors: true
          },
          before: app => {
            webConsole(app);
          }
          // historyApiFallback: {
          //   index: '/',
          //   rewrites: [
          //     {
          //       from: /^(\/[^/]*\.html)\/.*$/,
          //       to: context => context.match[1],
          //     },
          //   ],
          // },
        };

        WebpackDevServer.addDevServerEntrypoints(
          webpackConfig,
          devServerOptions
        );

        detectPort(3000, (err, availablePort) => {
          if (err) {
            console.log(error(`${err}`));
          } else {
            clearConsole();
            console.log(`${infoBlock(" WAITING ")} ${info("Building...")}`);
            const compiler = webpack(webpackConfig);
            const devServer = new WebpackDevServer(compiler, devServerOptions);
            global.ROCKETACT_PORT = availablePort;

            devServer.listen(availablePort, "0.0.0.0", () => {});
          }
        });
      });
    }
  );
};
