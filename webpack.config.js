module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: "./dist",
    publicPath:'http://localhost:' + process.env.PORT || '8000' + "/dist",
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
      }
    ]
  }
}
