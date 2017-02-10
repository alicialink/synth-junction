const gulp = require('gulp')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')

// Don't use the **/*js glob here so it doesn't descend into node_modules
const jsFiles = ['*.js']

gulp.task('lint', function () {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('default', ['lint'])
