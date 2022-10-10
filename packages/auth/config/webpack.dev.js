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
    port: 8082,
    historyApiFallback: {
      index: "/index.html",
    },
   
  },
  output:{
    publicPath: 'http://localhost:8082/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      // shared: ["react", "react-dom"],
      // shared: packageJson.dependencies, // this is for experiment

    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
