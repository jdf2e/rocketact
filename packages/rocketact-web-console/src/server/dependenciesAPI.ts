import fs from "fs";
import fse from "fs-extra";
import execa from "execa";
import semver from "semver";
import express from "express";

import { appRoot, appPackageJson } from "rocketact-dev-utils";
import { url } from "inspector";

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

function getDependenciesInstalledVersion(
  dependencies: IDependency[]
): Promise<void> {
  return execa("npm", ["list", "--depth=0", "--json"], {
    cwd: appRoot()
  })
    .then(result => JSON.parse(result.stdout))
    .then(result => {
      dependencies.forEach(d => {
        const info = result.dependencies[d.id];
        if (info) {
          d.installed = info.version;
        }
      });
    });
}

function getDependencyAvailaleVersion(dependency: IDependency): Promise<void> {
  return execa("npm", ["info", dependency.id, "--json"], {
    cwd: appRoot()
  })
    .then(result => JSON.parse(result.stdout))
    .then(result => {
      dependency.description = result.description;
      dependency.homepage = result.homepage;

      result.versions.forEach((version: string) => {
        if (semver.satisfies(version, dependency.range)) {
          if (!dependency.wanted) {
            dependency.wanted = version;
          } else if (semver.gt(version, dependency.wanted)) {
            dependency.wanted = version;
          }
        }
      });

      dependency.latest = result["dist-tags"].latest;
      dependency.next = result["dist-tags"].next;
    })
    .catch(r => undefined);
}

function getDependenciesAvailaleVersion(
  dependencies: IDependency[]
): Promise<void[]> {
  return Promise.all(dependencies.map(getDependencyAvailaleVersion));
}

function getDependencies(
  dependencyType: DependencyType
): Promise<IDependency[]> {
  const project = JSON.parse(
    fs.readFileSync(appPackageJson(), "utf-8").toString()
  );

  const dependencies: IDependency[] = Object.keys(project[dependencyType]).map(
    id => ({
      id,
      range: project[dependencyType][id]
    })
  );

  return Promise.all([
    getDependenciesInstalledVersion(dependencies),
    getDependenciesAvailaleVersion(dependencies)
  ]).then(() => dependencies);
}

const dependenciesAPI = express.Router();

dependenciesAPI.get("/main", (req, res) => {
  getDependencies(DependencyType.Main).then(r => res.json(r));
});

dependenciesAPI.get("/dev", (req, res) => {
  getDependencies(DependencyType.Dev).then(r => res.json(r));
});

export default dependenciesAPI;
