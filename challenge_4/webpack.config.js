var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
// var combineLoaders = require('webpack-combine-loaders')
module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      // {
      //   test: /\.css$/,
      //   loader: combineLoaders([
      //     {
      //       loader: 'style-loader'
      //     }, {
      //       loader: 'css-loader',
      //     }
      //   ])
      // }
    ]
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    port: 5000
  }
};