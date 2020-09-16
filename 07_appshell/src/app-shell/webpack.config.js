const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = (webpackConfigEnv) => {
  const orgName = "mf-me";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    output: {
      publicPath: ASSET_PATH,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
          orgName,
        },
      }),
      new webpack.DefinePlugin({
        "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
      }),
    ],
  });
};
