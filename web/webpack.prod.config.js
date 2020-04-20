const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	optimization: {
		splitChunks: {
		  chunks: 'all',
		  minSize: 30000,
		  maxSize: 0,
		  minChunks: 1,
		  maxAsyncRequests: 5,
		  maxInitialRequests: 3,
		  automaticNameDelimiter: '~',
		  automaticNameMaxLength: 30,
		  name: true,
		  cacheGroups: {
			vendors: {
			  test: /[\\/]node_modules[\\/]/,
			  priority: -10
			},
			default: {
			  minChunks: 2,
			  priority: -20,
			  reuseExistingChunk: true
			}
		  }
		}
	  },
    entry: {
        index: './src/entry/index.js'
	},
	mode: 'production',
	devtool: false,
    plugins: [
    	new HtmlWebpackPlugin({
				favicon:'./src/entry/images/favicon.ico',
				title: '棋牌游戏',
				minify:{
					html5:true,
					collapseWhitespace: true,
					preserveLineBreaks: false,
					minifyCSS: true,
					minifyJS: true,
					removeComments: true
				}
			}),
		new ExtractTextPlugin("[name].css"),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp:/\.css$/g,
  			cssProcessor:require('cssnano')
		}),
		new BundleAnalyzerPlugin({
			analyzerPort: 8919
		})
	],
    output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		},
  module: {
	  rules: [
	    {
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				'babel-loader'
			]
		  },{
			test: /\.(png|svg|jpg|gif|ico)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						 name: 'images/[hash:8].[name].[ext]',
						 context: 'dist',
						 limit: 8192,	
						 publicPath: './'
					 }
				 }
			]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						 name: 'images/[hash:8].[name].[ext]',
						 context: 'dist',
						 limit: 8192,	
						 publicPath: './'
					 }
				 }
			]
		}, {
			test: /\.(csv|tsv)$/,
			use: [
				'csv-loader'
				]
		}, {
			test: /\.xml$/,
			use: [
				'xml-loader'
				]
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
			  fallback: "style-loader",
			  use: "css-loader"
			})
		}, {
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				'less-loader'
			]
		  }
		]
  }
};