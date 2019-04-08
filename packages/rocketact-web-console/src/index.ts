import path from "path";
import express from "express";

import projectAPI from "./server/projectAPI";
import pagesAPI from "./server/pagesAPI";
import dependenciesAPI from "./server/dependenciesAPI";
import proxyAPI, { proxyHandler } from "./server/proxyAPI";

export default (app: express.Application) => {
  app.use(proxyHandler);
  app.use(express.json());

  app.use(
    "/ROCKETACT_WEB_CONSOLE/static",
    express.static(path.join(__dirname, "client"))
  );

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/app.html"));
  });

  app.use("/ROCKETACT_WEB_CONSOLE/api/project", projectAPI);
  app.use("/ROCKETACT_WEB_CONSOLE/api/pages", pagesAPI);
  app.use("/ROCKETACT_WEB_CONSOLE/api/dependencies", dependenciesAPI);
  app.use("/ROCKETACT_WEB_CONSOLE/api/api-proxy", proxyAPI);
};
