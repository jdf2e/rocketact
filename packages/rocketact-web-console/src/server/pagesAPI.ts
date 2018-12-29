import fs from "fs";
import path from "path";
import express from "express";

import { getValidEntries, appRoot } from "rocketact-dev-utils";

const pagesAPI = express.Router();

pagesAPI.get("/", (req, res) => {
  const plugins = global.ROCKETACT_CORE.webpackChain.plugins.entries();

  const data: Array<{ name: string; title: string }> = [];
  Object.keys(plugins).forEach(pluginName => {
    const result = pluginName.match(/^HtmlWebpackPlugin-(.*)$/);

    if (result) {
      const key = result[1];

      plugins[pluginName].tap((args: any) => {
        const final: any = {};

        Object.assign(final, ...args);

        const html = fs.readFileSync(final.template, "utf-8").toString();
        const title = html.match(/<title>([^<]*)<\/title>/);
        data.push({ name: key, title: title ? title[1] : "N/A" });

        return args;
      });
    }
  });

  res.json({ data, success: true });
});

export default pagesAPI;
