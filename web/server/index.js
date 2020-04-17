/*
 * A demo for http://ant.design/
 *
 * v0.1.0 - 2019-03-12
 * @author tx
*/

'use strict';
const http    = require('http');
const express = require('express');
const router  = express.Router();
const webpack = require('webpack')
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const index = require('./routes/index');
const func = require('./routes/func');
const test = require('./routes/test');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

const webpackConfig = require('../webpack.dev.config')
const compiler = webpack(webpackConfig)
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler,{
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use("/", index);
app.use("/*", index);
// app.use('/',test);

app.all("/*", function(req, res){
  // 判断是否登录
  res.render('index', { title: 'ftp-monitor' });
});
// listen
app.listen(3000)
console.log('listening on port 3000')
