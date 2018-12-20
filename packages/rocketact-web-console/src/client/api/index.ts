import axios from "axios";

import { IDependency } from "../../server/dependenciesAPI";
import { IPackage } from "../components/PackageInstaller";

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

function getDependencies(type: string): Promise<IDependency[]> {
  return axios
    .get(`${API_BASE}/dependencies/${type}`)
    .then(response => response.data);
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

export { getProject, getPages, getDependencies, searchNPM };
