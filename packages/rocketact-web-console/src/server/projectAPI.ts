import fs from "fs";
import path from "path";
import express from "express";

import { appPackageJson } from "rocketact-dev-utils";

const pagesAPI = express.Router();

pagesAPI.get("/", (req, res) => {
  const project = JSON.parse(
    fs.readFileSync(appPackageJson(), "utf-8").toString()
  );
  res.json({
    name: project.name,
    description: project.description
  });
});

export default pagesAPI;
