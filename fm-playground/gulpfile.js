const gulp = require('gulp')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')

const jsFiles = ['js/*.js']

gulp.task('lint', function () {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('default', ['lint'])
