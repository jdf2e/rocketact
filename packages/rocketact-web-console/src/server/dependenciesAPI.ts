import fs from "fs";
import fse from "fs-extra";
import execa from "execa";
import semver from "semver";
import express from "express";
import axios from "axios";
import url from "url";

import { appRoot, appPackageJson } from "rocketact-dev-utils";

export enum DependencyType {
  Main = "dependencies",
  Dev = "devDependencies"
}

export interface IDependency {
  id: string;
  range: string;
  installed?: string;
  wanted?: string;
  latest?: string;
  next?: string;
  homepage?: string;
  description?: string;
}

function getDependenciesInstalledVersion(): Promise<{ [key: string]: string }> {
  return execa("npm", ["list", "--depth=0", "--json"], {
    cwd: appRoot()
  })
    .then(result => JSON.parse(result.stdout).dependencies)
    .then(listResult => {
      const result: { [key: string]: string } = {};

      Object.keys(listResult).forEach(
        key => (result[key] = listResult[key].version)
      );

      return result;
    });
}

function getDependenciesInPackageJson(): Promise<{
  main: IDependency[];
  dev: IDependency[];
}> {
  return fse.readJson(appPackageJson()).then(project => {
    return {
      main: Object.keys(project[DependencyType.Main]).map(
        id =>
          ({
            id,
            range: project[DependencyType.Main][id]
          } as IDependency)
      ),
      dev: Object.keys(project[DependencyType.Dev]).map(
        id =>
          ({
            id,
            range: project[DependencyType.Dev][id]
          } as IDependency)
      )
    };
  });
}

function getDependencies(): Promise<{
  main: IDependency[];
  dev: IDependency[];
}> {
  return Promise.all([
    getDependenciesInPackageJson(),
    getDependenciesInstalledVersion()
  ]).then(result => {
    const dependencies = result[0];
    const installedStats = result[1];

    dependencies.main.forEach(i => (i.installed = installedStats[i.id]));
    dependencies.dev.forEach(i => (i.installed = installedStats[i.id]));

    return dependencies;
  });
}

const dependenciesAPI = express.Router();

dependenciesAPI.get("/", (req, res) => {
  getDependencies().then(r => res.json(r));
});

dependenciesAPI.get("/npmPackageDetail", (req, res) => {
  const urlParams = url.parse(req.url, true);

  axios
    .get(`http://registry.npmjs.org/${urlParams.query.name}`)
    .then(response => response.data)
    .then(response => {
      response.versions = Object.keys(response.versions);

      res.json(response);
    })
    .catch(() => {
      res.end();
    });
});

export default dependenciesAPI;
