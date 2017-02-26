let gulp = require('gulp');
let clean = require('gulp-clean');
let server = require('gulp-develop-server');
let webpack = require('webpack');
let shell = require('gulp-shell');
let webpackConfig = require('./webpack.config.js');
let entries = require('./config.load').entries;

let basePath = '../IPass_App/';
let delFile = ['css', 'html', 'js', 'font'];

// 清除上一次执行webpack的文件目录
gulp.task('clean', () => {
  let src = [];
  delFile.forEach((del) => {
    src.push(basePath + del);
  });
  return gulp.src(src).pipe(clean({force: true}))
});


// gulp.task('webpack', shell.task([
//     'webpack -w -p'
//   ])
// );
gulp.task('build', () => {
  webpack(webpackConfig, (err, stats) => {
    if(err) console.log(err);

  });
});

gulp.task('watch', () => {
  gulp.watch('.src/**');
});

// 启动后台服务，需先启动mongodb
gulp.task('serve', ['clean', 'build'], () => {
  server.listen({
    path: './app-server/server.js'
  });
});