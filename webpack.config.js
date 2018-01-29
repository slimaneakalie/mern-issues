const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry : {
		app : './src/App.jsx',
		vendor : ['react', 'react-dom', 'whatwg-fetch', 'react-router']
	},
	output : {
		path : path.join(__dirname, '/MyStaticPages/js'),
		filename : 'app.bundle.js'
	},
	plugins : [
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
	],
	module : {
		loaders : [
			{
				test : /\.jsx$/,
				loader : 'babel-loader',
				query : {
					presets : ['react', 'es2015']
				}
			}
		]
	},
	devtool : 'source-map',
	devServer : {
		port : 800,
		contentBase : 'MyStaticPages',
		proxy : {
			'/api/*': {
				target : 'http://localhost:300'
			}
		}
	}

};