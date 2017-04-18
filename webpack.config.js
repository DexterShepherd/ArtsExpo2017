const webpack = require('webpack');

module.exports = {
  entry: './client/main.js',
  output: {
    file: 'bundle.js',
    publicPath: '/client/',
    path: __dirname + '/client'
  },

  devServer: {
    inline: true,
    port: 3333,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}
