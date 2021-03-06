'use strict';
const gulp = require('gulp');
const shell = require('shelljs');
const zip = require('gulp-zip');
const size = require('gulp-size');
const argv = require('yargs').argv;

// 'gulp jekyll:tmp' -- copies your Jekyll site to a temporary directory
// to be processed
gulp.task('site:tmp', () =>
  gulp.src(['src/**/*', '!src/assets/**/*', '!src/assets'])
    .pipe(gulp.dest('.tmp/src'))
    .pipe(size({title: 'Jekyll'}))
);

// 'gulp zip:site' -- zip's BCBSM assets/site.
gulp.task('zip:site', () =>
  gulp.src(['.tmp/assets/**/*', '.tmp/src/bcbsm/**/*', '!.tmp/src/bcbsm/images'])
    .pipe(zip('bcbsm.zip'))
    .pipe(gulp.dest('.tmp/assets/downloads'))
);

// 'gulp jekyll' -- builds your site with development settings
// 'gulp jekyll --prod' -- builds your site with production settings
// 'gulp jekyll --gitpages' -- builds your site with github-pages settings
gulp.task('site', done => {
  if (!argv.prod && !argv.gitpages) {
    shell.exec('jekyll build');
    done();
  } else if (argv.gitpages && !argv.prod){
    shell.exec('jekyll build --config _config.yml,_config.build.gitpages.yml');
    done();
  } else if (argv.prod) {
    shell.exec('jekyll build --config _config.yml,_config.build.prod.yml');
    done();
  }
});

// 'gulp doctor' -- literally just runs jekyll doctor
gulp.task('site:check', done => {
  shell.exec('jekyll doctor');
  done();
});
