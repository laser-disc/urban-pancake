var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    // path: __dirname + '/dist',
    path: "/",
    publicPath:'http://localhost:' + process.env.PORT || '8000' +"/dist",
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig],
  target: 'web'
}