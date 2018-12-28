import fs from "fs";
import fse from "fs-extra";
import execa from "execa";
import semver from "semver";
import express from "express";
import axios from "axios";
import url from "url";

import {
  appRoot,
  appPackageJson,
  packageUtil,
  resolveToAppRoot
} from "rocketact-dev-utils";

export enum DependencyType {
  Main = "dependencies",
  Dev = "devDependencies"
}

export interface IDependency {
  id: string;
  range: string;
  isDev: boolean;
  installed?: string;
  wanted?: string;
  latest?: string;
  next?: string;
  homepage?: string;
  description?: string;
}

function getDependenciesInstalledVersion(): Promise<{ [key: string]: string }> {
  if (fs.existsSync(resolveToAppRoot("./yarn.lock"))) {
    return execa("yarn", ["list", "--depth", "0"], {
      cwd: appRoot()
    }).then(result => {
      if (result.failed) {
        throw new Error(result.stderr);
      }
      return result.stdout
        .split("\n")
        .filter(l => l.startsWith("├─ "))
        .map(l => l.replace("├─ ", ""))
        .reduce(
          (acc, l: string): { [keys: string]: string } => {
            const parts = l.split("@");
            acc[parts.slice(0, -1).join("@")] = parts[parts.length - 1];
            return acc;
          },
          {} as { [keys: string]: string }
        );
    });
  } else {
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
            range: project[DependencyType.Main][id],
            isDev: false
          } as IDependency)
      ),
      dev: Object.keys(project[DependencyType.Dev]).map(
        id =>
          ({
            id,
            range: project[DependencyType.Dev][id],
            isDev: true
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
  getDependencies().then(r => res.json(r), () => res.json({ succss: false }));
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

dependenciesAPI.post("/install", (req, res) => {
  if (req.body && req.body.name) {
    packageUtil
      .install(req.body.name, {
        versionOrTag: req.body.version,
        isDev: !!req.body.isDev
      })
      .then(
        () => {
          res.json({ success: true });
        },
        error => {
          res.json({ success: false });
        }
      );
  } else {
    res.json({ success: false });
  }
});

dependenciesAPI.post("/uninstall", (req, res) => {
  if (req.body && req.body.name) {
    packageUtil.uninstall(req.body.name).then(
      () => {
        res.json({ success: true });
      },
      error => {
        res.json({ success: false });
      }
    );
  } else {
    res.json({ success: false });
  }
});

export default dependenciesAPI;
