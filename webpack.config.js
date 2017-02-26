let config = require('./config.load.js');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: config.entries,
  output: {
    path: '../IPass_App',
    publicPath: '../',
    filename: "js/[name].js",
    chunkFilename: 'js/chunk/[id].chunk.js?[hash:8]'
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue',},
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?&name=img/[name].[ext]'},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader : 'file-loader?name=font/[name].[ext]'},
    ]
  },
  babel: {
    "presets": ['es2015'],
    "plugins": ['transform-runtime', "transform-remove-strict-mode"]
  },
  plugins: config.plugins,
  resolve: {
    alias: {
      "$api": './common/api.js',
      "$mui": './common/mui.min.js',
      "$icon": './common/iconfont.js',
      "$_api": './api/api.js',
      "$aui-dialog": "./common/aui-dialog.js",
      "$chart": './common/Chart.min.js',
      "$swiper": './common/swiper.jquery.min.js',
      "$jq": './common/jquery-1.7.2.min.js',
    }
  },
  watch: true
};