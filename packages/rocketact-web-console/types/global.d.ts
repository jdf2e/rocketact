import Config = require("../node_modules/@types/webpack-chain");

declare global {
  namespace NodeJS {
    interface Global {
      ROCKETACT_CORE: {
        webpackChain: Config;
      };
    }
  }
}
