const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

const compiler = webpack(config);

const app = express();

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');

app.listen(app.get('port'), app.get('host'), webpackDevMiddleware.listen);

app.use(express.static('client'))
