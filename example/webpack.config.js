const path = require("path");

module.exports = {
  mode: "development",
  entry: "./main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: path.resolve("../src/debug-log-loader.js"),
            options: {
              include: "include",
              exclude: "exclude",
              output: "dir/",
              name: "[name].debug[ext]",
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};
