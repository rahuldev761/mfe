const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const { ModuleFederationPlugin } = require("webpack").container;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: '/marketing/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/index",
      },
      // shared: ["react", "react-dom"], // we can do this also
      shared: packageJson.dependencies, // this is for experiment
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
