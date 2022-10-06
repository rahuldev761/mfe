const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
/* 
 The ModuleFederationPlugin allows a build to provide or consume modules with other
 independent builds at runtime.
 */
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require('../package.json');

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/index",
      },
      // shared: ["react", "react-dom"],
      shared: packageJson.dependencies, // this is for experiment

    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
