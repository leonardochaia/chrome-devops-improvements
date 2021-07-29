import * as path from "path";
import CopyPlugin from "copy-webpack-plugin";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const config = {
  devtool: "source-map",
  entry: {
    content: path.resolve("src/content.ts"),
  },
  output: { path: path.resolve("dist"), filename: "[name].js" },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    fallback: {
      "fs": false,
      "child_process": false,
      "module": false
    },
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
};

export default config;
