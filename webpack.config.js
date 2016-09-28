'use strict'

const webpack = require("webpack");
const BowerWebpackPlugin = require("bower-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + '/dist',
		filename: NODE_ENV == 'dev' ? "RadialBar.js" : "RadialBar.min.js",
		library: "RadialBar"
	},
	watch: NODE_ENV == "dev",
	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: NODE_ENV == "dev" ? "source-map" : null,

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: "babel"
		}]	
	},
	plugins: [
		new BowerWebpackPlugin({
			modulesDirectories: ['bower_components'],
			manifestFiles: ['bower.json'],
			includes: /.*/,
			excludes: /.*\.less$/
		})
	]
};

if(NODE_ENV == "production") {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			warnings: false,
			drop_console: true,
			unsafe: true
		})
	)
}