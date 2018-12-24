const HtmlWebpackPlugin = require("html-webpack-plugin");

import { isProductionEnv } from "../utils/environment";

export default function(config: { entryName: string; template: string }) {
  return new HtmlWebpackPlugin({
    filename: `${config.entryName}.html`,
    template: config.template,
    chunks: [config.entryName, isProductionEnv() ? "vender" : ""].filter(
      Boolean
    ),
    inject: true
  });
}
