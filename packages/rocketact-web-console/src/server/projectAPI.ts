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
    data: {
      name: project.name,
      description: project.description
    },
    success: true
  });
});

export default pagesAPI;
