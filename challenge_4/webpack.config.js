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
}
};