const HtmlWebpackPlugin = require("html-webpack-plugin");

import { isProductionEnv } from "../utils/environment";
import { PluginClass } from "webpack-chain";

export default function (config: {
  entryName: string;
  template: string;
}): [PluginClass, [any]] {
  return [
    HtmlWebpackPlugin,
    [
      {
        filename: `${config.entryName}.html`,
        template: config.template,
        publicPath: process.env.PUBLIC_URL || "",
        chunks: [config.entryName, isProductionEnv() ? "vendor" : ""].filter(
          Boolean
        ),
        inject: true,
      },
    ],
  ];
}
