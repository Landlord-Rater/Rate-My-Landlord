const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./frontend/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.s?css/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/index.html",
    }),
  ],
  devServer: {
    static: {
      publicPath: "/",
      directory: path.join(__dirname, "./frontend/src"),
    },
    proxy: {
      "/user": "http://localhost:3000/",
      "/reviews": "http://localhost:3000/",
      "/properties": "http://localhost:3000/",
      "/landlords": "http://localhost:3000/",
    },
    historyApiFallback: true,
  },
};
