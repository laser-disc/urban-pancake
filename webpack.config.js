var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    // publicPath:'http://localhost:' + process.env.PORT || '8000' + "/dist",
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  devServer: {
    contentBase: 'client'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
