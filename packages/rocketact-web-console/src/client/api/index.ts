import axios from "axios";

import { IDependency } from "../../server/dependenciesAPI";
import { IPackage } from "../components/PackageInstaller";

export interface IPackageDetail {
  description: string;
  "dist-tags": {
    latest: string;
    next: string;
  };
  homepage: string;
  versions: string[];
}

export interface ISearchResult {
  total: number;
  objects: Array<{ package: IPackage }>;
}

const API_BASE = "/ROCKETACT_WEB_CONSOLE/api";

function getProject() {
  return axios.get(`${API_BASE}/project`).then(response => response.data);
}

function getPages() {
  return axios.get(`${API_BASE}/pages`).then(response => response.data);
}

function getDependencies(): Promise<{
  main: IDependency[];
  dev: IDependency[];
}> {
  return axios.get(`${API_BASE}/dependencies`).then(response => response.data);
}

function searchNPM(
  keyword: string,
  page: number,
  pageSize: number = 10
): Promise<ISearchResult> {
  return axios
    .get("http://registry.npmjs.org/-/v1/search", {
      params: {
        text: keyword,
        size: pageSize,
        from: (page - 1) * pageSize
      }
    })
    .then(response => response.data);
}

function getNPMPackageDetail(name: string): Promise<IPackageDetail> {
  return axios
    .get(`${API_BASE}/dependencies/npmPackageDetail?name=${name}`)
    .then(response => response.data)
    .then(response => {
      response.versions = Object.values(response.versions);

      return response as IPackageDetail;
    });
}

function install(
  name: string,
  options: {
    version?: string;
    isDev: boolean;
  }
) {
  return axios
    .post(`${API_BASE}/dependencies/install`, { ...options, name })
    .then(response => response.data)
    .then(response => {
      if (!response.success) {
        throw new Error();
      }
    });
}

export {
  getProject,
  getPages,
  getDependencies,
  searchNPM,
  getNPMPackageDetail,
  install
};
