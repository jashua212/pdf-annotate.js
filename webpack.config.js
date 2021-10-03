
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './docs/main.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'docs') // output directory
	},

	// must ignore index.js when watching -- otherwise, webpack will compile in an infinite loop when index.js gets copied by the CopyPlugin
	watchOptions: {
		ignored: [
			'**/node_modules',
			'C:/Users/jashu/GitHub/instructure/pdf-annotate.js/docs/index.js'
		]
	},

	// plugins NOT related to minification
	plugins: [
		// copy compiled 'index.js' file move it to exams_SAT repo
		new CopyPlugin({
			patterns: [
				{
					from: 'C:/Users/jashu/GitHub/instructure/pdf-annotate.js/docs/index.js',
					to: 'C:/Users/jashu/GitHub/exams_SAT/src/pdf-assets/pdf-annotate-index.js'
				}
			]
		}),
	]
};


/* var fileName = 'pdf-annotate';
var plugins = [];

if (process.env.MINIFY) {
	fileName += '.min'
	plugins.push(
		new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
	devtool: 'source-map',
	plugins: plugins,
	entry: './index.js',
	output: {
		filename: 'dist/' + fileName + '.js',
		library: 'PDFAnnotate',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
					plugins: ['add-module-exports']
				}
			}
		]
	}
}; */
