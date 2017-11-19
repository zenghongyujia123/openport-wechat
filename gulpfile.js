'use strict';

//glup test 用于单元测试
//glup web 用于前端编译和合并

process.env.NODE_ENV = 'test';

var gulp = require('gulp');
var less = require('gulp-less');
var jsconcat = require('gulp-concat');


// var serverJsFiles = ['gruntfile.js','models/**/*.js', 'server.js', 'config/**/*.js', 'app/**/*.js', '!app/libraries/**'];
// var mochaJsFiles = ['app/tests/**/**/**/*.js'];

// gulp.task('app-less', function () {
//   return gulp.src('web/zzqs2/lesses/index.client.style.less')
//     .pipe(less())
//     .pipe(rename(function (path) {
//       path.basename = 'zhuzhuqs';
//     }))
//     .pipe(gulp.dest('web/zzqs2/dist/css'));
// });

gulp.task('platform-less', function () {
  gulp.src('web/c_platform/lesses/*.less')
    .pipe(less())
    .pipe(gulp.dest('web/c_platform/css'));
  gulp.src('web/c_wechat/lesses/*.less')
    .pipe(less())
    .pipe(gulp.dest('web/c_wechat/css'));
  gulp.src('web/c_backend/site_admin/lesses/chaoqian.client.style.less')
    .pipe(less())
    .pipe(gulp.dest('web/c_backend/site_admin/dist/css'));

  return;
});

gulp.task('js-concat', function () {
  return gulp.src([
    'web/c_backend/site_admin/app.js',
    'web/c_backend/site_admin/event/**/*.js',
    'web/c_backend/site_admin/constants/**/*.js',
    'web/c_backend/site_admin/networks/**/*.js',
    'web/c_backend/site_admin/services/**/*.js',
    'web/c_backend/site_admin/directive/**/*.js',
    'web/c_backend/site_admin/controllers/**/*.js',
  ])
    .pipe(jsconcat('chaoqian.js'))
    .pipe(gulp.dest('web/c_backend/site_admin/dist/js'))
    .on('finish', function () {
    });
});


gulp.task('web', ['platform-less', 'js-concat']);
