// var HtmlWebpackPlugin = require('html-webpack-plugin')
// var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/client/index.html',
//   filename: 'index.html',
//   inject: 'body'
// })
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    // path: __dirname + '/dist',
    path: "/",
    publicPath:'http://localhost:' + '8000' +"/dist/",
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  target: 'web'
}
