var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
  devtool: 'source-map',
  cache:true,
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
      modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
  },
  output: {
    path: path.join(process.cwd(),'./dist/'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/static/'
  },
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app/entry/index.js'
  ],
  module: {
    loaders: [{
       test: /\.js?$/,
       exclude: /node_modules/,
       loader: 'es3ify-loader',
       query:{
         plugins:['antd']
       }
     },{
        test: /\.js?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['add-module-exports'],
      },
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    },{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!' + 'autoprefixer-loader!' + ('less?{"sourceMap":true,"modifyVars":' + JSON.stringify(pkg.theme || {}) + '}'))
      }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-restructuring!' +
            'postcss-loader!'+
            'autoprefixer-loader!'
      )
    }, { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
        { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000' },
        { test: /\.json$/, loader: 'json' }
      ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new ExtractTextPlugin('[name].css', {
            disable: false,
            allChunks: true
        }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
