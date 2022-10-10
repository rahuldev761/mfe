const { merge } = require("webpack-merge");
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
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  output:{
    publicPath: 'http://localhost:8080/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name:'container',
      remotes:{
        marketing:'marketing@http://localhost:8081/remoteEntry.js',
        auth:'auth@http://localhost:8082/remoteEntry.js'
      },
       // shared: ["react", "react-dom"],
      shared: packageJson.dependencies, //this is for experiment
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
