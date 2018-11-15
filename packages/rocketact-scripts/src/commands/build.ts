import CoreAPI from "../CoreAPI";

export default (api: CoreAPI) => {
  api.registerCommand("build", () => {
    console.log("build");
  });
};
