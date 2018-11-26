import webpack from "webpack";
import DevServer from "webpack-dev-server";
import detectPort from "detect-port";

import { error, success } from "rocketact-dev-utils";

import CoreAPI from "../CoreAPI";

export default (api: CoreAPI) => {
  api.registerCommand(
    "start",
    (): Promise<any> => {
      process.env.NODE_ENV = "development";

      return new Promise((resolve, reject) => {
        const webpackConfig = api.resolveWebpackConfig();
        const devServerOptions = {
          disableHostCheck: true,
          overlay: true,
          hot: true,
          host: "127.0.0.1",
          publicPath: "/",
          // contentBase: ['./src/html', './src'],
          stats: {
            colors: true
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

        DevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

        const compiler = webpack(webpackConfig);
        const devServer = new DevServer(compiler, devServerOptions);
        detectPort(3000, (err, availablePort) => {
          if (err) {
            console.log(error(`${err}`));
          } else {
            devServer.listen(availablePort, "127.0.0.1", () => {
              console.log(
                success(
                  `Dev server running at http://127.0.0.1:${availablePort}`
                )
              );
            });
          }
        });
        // webpack(api.resolveWebpackPlugins(), (err, stats) => {
        //   if (err || stats.hasErrors()) {
        //     console.log(error(`${err.name}: ${err.message}`));
        //     reject(err);
        //   } else {
        //     console.log("Build Success!");
        //     resolve();
        //   }
        // });
      });
    }
  );
};
