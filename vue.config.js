/*
 * @Author: your name
 * @Date: 2021-05-17 19:22:53
 * @LastEditTime: 2021-06-01 16:56:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\vue.config.ts
 */
const path = require("path");
const webpack = require("webpack");
const config = require("./public/config/index.ts");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "",
  outputDir: "dist/page",
  devServer: {
    host: "0.0.0.0",
    port: 8020,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/ecpJson.action": {
        target: config.baseURL,
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        //   "^/api": "",
        // },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("base", resolve("baseConfig"))
      .set("public", resolve("public"));
  },
  configureWebpack: {
    devtool: "source-map",
    // devtool: process.env.NODE_ENV == "development" || process.argv.indexOf("--test") != -1 ? "source-map" : "none",
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js",
      }),
    ],
  },
};
