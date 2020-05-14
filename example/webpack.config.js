const path = require("path");

module.exports = {
  mode: "development",
  entry: "./main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
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
        ],
      },
    ],
  },
};
