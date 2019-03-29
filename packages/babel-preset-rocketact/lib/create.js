const path = require("path");

module.exports = function(api, options, env) {
  const isDevelopmentEnv = env === "development";
  const isProductionEnv = env === "production";

  return {
    presets: [
      [require.resolve("@babel/preset-env"), { modules: false }],
      require.resolve("@babel/preset-typescript"),
      require.resolve("@babel/preset-react")
    ],
    plugins: [
      [
        require.resolve("@babel/plugin-transform-runtime"),
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: true,
          absoluteRuntime: path.dirname(
            require.resolve("@babel/runtime/package.json")
          )
        }
      ],
      require.resolve("@babel/plugin-proposal-class-properties"),
      require.resolve("@babel/plugin-proposal-object-rest-spread"),
      require.resolve("@babel/plugin-syntax-dynamic-import"),
      require.resolve("babel-plugin-transform-react-remove-prop-types")
    ]
  };
};
