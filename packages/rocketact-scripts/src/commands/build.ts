import CoreAPI from "../CoreAPI";

export default (api: CoreAPI) => {
  api.registerCommand("build", () => {
    process.env.NODE_ENV = "production";

    console.log(api.resolveWebpackPlugins());
  });
};
