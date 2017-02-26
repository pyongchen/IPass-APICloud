let webpack = require('webpack');
let fs = require('fs');
let path = require('path');
let glob = require('glob');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// 加载src/js文件夹下的js文件
let entries = function (globPath) {
  let files = glob.sync(globPath);
  let entries = {}, entry, dirname, basename;
  for (let i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    basename = path.basename(entry, '.js');
    entries[basename] = entry
  }
  return entries;
};

let webpackPlugins = function (srcHTML, desHTML) {
  let plugins = [];

  // 提取公共文件
  let commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common', 'js/common/common.js');
  plugins.push(commonsPlugin);

  let htmls = glob.sync(srcHTML);
  for (let i = 0; i < htmls.length; i++) {
    let file = htmls[i];
    let basename = path.basename(file, '.html');
    plugins.push(new HtmlWebpackPlugin({
      title: 'IPASS',
      template: file, // ./src/html/xxx.html
      filename: desHTML + basename + '.html', // ./html/xxx.html
      chunks: ["common", basename],
      inject: 'body'
    }));
  }

  //提取CSS
  plugins.push(new ExtractTextPlugin('css/[name].css', {
    allChunks: true
  }));

  //代码压缩，开发室关闭，提高更新性能
  // plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false
  //   }
  // }));

  return plugins;
};

module.exports = {
  entries: entries('./src/js/*.js'),
  plugins: webpackPlugins('./src/html/*.html', './html/')
};
