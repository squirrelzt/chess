'use strict';
const path = require('path');
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const mockData = require('./mock-data');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');


const config = require('./../webpack.config.js');
const compiler = webpack(config);
const history = require('connect-history-api-fallback');

// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(favicon(path.join(__dirname, './../src/entry/images/favicon.ico')));

app.use(history({
    verbose: true,
    index: '/'
}));

app.use(express.static(__dirname + '../src/entry'));

// app.use("/", mockData);

app.get('*/', function(req, res) {
    res.sendFile(path.join(__dirname, './../dist/index.html'));
});

//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000 .....');
});
