var webpack = require('webpack');
var path = require('path');
var isProd = (process.env.NODE_ENV === 'production');
var devTool = isProd ? false : 'inline-source-map';

module.exports = {
  entry: {
    global: './src/global.js',
    xl: './src/global-xl.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'popmotion.[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader'
      }
    ],
  },
  resolve: {
    alias: {
      popmotion: path.resolve(__dirname, 'src/popmotion.js')
    },
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ]
  },
  plugins: isProd ? [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      minimize: true
    })
  ] : [

  ],
  devtool: devTool
};