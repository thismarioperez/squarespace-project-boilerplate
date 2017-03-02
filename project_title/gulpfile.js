/* ==========================================================
** EXPOSE REQUIRED PACKAGES
========================================================== */
const gulp = require('gulp');
const inline = require('gulp-inline');

/**
 * Critical Block
 * A critical styles task that inlines critical styles
 * into a critical.block file.
 */
gulp.task('critical-block', function () {
  return gulp.src('./template/styles/critical/critical.block')
    .pipe(inline({
      base: './template/'
    }))
    .pipe(gulp.dest('./build/blocks/'));
});
