import fs from "fs";
import path from "path";
import express from "express";

import { getValidEntries, appRoot } from "rocketact-dev-utils";

const pagesAPI = express.Router();

pagesAPI.get("/", (req, res) => {
  const entries = getValidEntries(appRoot());

  const data = Object.keys(entries).map(key => {
    const html = fs.readFileSync(entries[key].html, "utf-8").toString();
    const title = html.match(/<title>([^<]*)<\/title>/);
    return { name: key, title: title ? title[1] : "N/A" };
  });
  res.json(data);
});

export default pagesAPI;
