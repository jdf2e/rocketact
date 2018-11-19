import CoreAPI from "../../CoreAPI";

import { isDevelopmentEnv } from "../../utils/environment";

import { getValidEntries, appRoot } from "rocketact-dev-utils";

export default (api: CoreAPI) => {
  api.chainWebpack(webpackChain => {
    const validEntries = getValidEntries(appRoot);

    Object.keys(validEntries).forEach(entryName => {
      const entry = validEntries[entryName];

      webpackChain
        .entry(entryName)
        .add(entry.js)
        .end();
    });
  });
};
