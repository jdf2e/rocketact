const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const postcssFlexbugsFixes = require("postcss-flexbugs-fixes");
const cssnano = require("cssnano");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
  mode: "production",
  devtool: false,
  entry: { app: "./src/client/app.tsx" },
  output: {
    pathinfo: false,
    path: `${__dirname}/client`,
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "./ROCKETACT_WEB_CONSOLE/static/"
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js"]
  },
  optimization: {
    nodeEnv: "production",
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          ecma: 5,
          mangle: true,
          compress: {
            drop_console: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          reduceIdents: false,
          mergeIdents: false,
          discardUnused: false,
          autoprefixer: false,
          zindex: false
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        include: `${__dirname}/src/client`,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { modules: false }],
                "@babel/preset-react",
                "@babel/preset-typescript"
              ],
              plugins: [["import", { "libraryName": "antd", style: "css" }]],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9",
                    "iOS 8"
                  ],
                  flexbox: "no-2009"
                })
              ]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src"]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      filename: "app.html",
      template: "src/client/app.html",
      chunks: ["app"],
      inject: true
    })
  ]
};

module.exports = config;
