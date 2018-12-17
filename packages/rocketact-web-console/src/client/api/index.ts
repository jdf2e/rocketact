import axios from "axios";

const API_BASE = "/ROCKETACT_WEB_CONSOLE/api";

function getProject() {
  return axios.get(`${API_BASE}/project`).then(response => response.data);
}

function getPages() {
  return axios.get(`${API_BASE}/pages`).then(response => response.data);
}

export { getProject, getPages };
