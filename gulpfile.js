const gulp         = require('gulp');
const nodemon      = require('gulp-nodemon');
const beautify     = require('gulp-beautify');
const eslint       = require('gulp-eslint');
const jsDoc        = require('gulp-jsdoc3');
const rm           = require('gulp-rm');
const runSequence  = require('run-sequence');

const libFiles        = './lib/**/*.js';
const testFiles       = './test/**/*.js';
const lintFiles       = ['./lib/**/*.js', './test/**/*.js', './index.js'];
const destLibsFolder  = './lib';
const destTestsFolder = './test';
const coverageDir     = './coverage';

const nodemonOpts  = {
    script:          './index.js',
    env:             { 'NODE_ENV': 'development' }
};



/**
 * Beautify all the files in srcFiles
 */
gulp.task('beautify-lib-files', () => {
    gulp.src(libFiles)
        .pipe(beautify())
        .pipe(gulp.dest(destLibsFolder));
});

/**
 * Beautify all the files in srcFiles
 */
gulp.task('beautify-test-files', () => {
    gulp.src(testFiles)
        .pipe(beautify())
        .pipe(gulp.dest(destTestsFolder));
});

gulp.task('beautify', cb => runSequence('beautify-lib-files', 'beautify-test-files', cb));

/**
 * Run eslint to lib and test files
 */
gulp.task('lint', cb => {
    gulp.src(lintFiles)
        .pipe(eslint)
        .pipe(eslint.format())
        .pipe(eslint.failOnError(), cb);
});

/**
 * Watch files changes and run lint
 */
gulp.task('watch-lint', () => runSequence(() => gulp.watch(lintFiles, ['lint'])));

/**
 * Generate jsDocs
 */
gulp.task('docs', cb => {
    let config = require('./jsdoc.json');

    gulp.src(['README.md', libFiles], { read: false})
        .pipe(jsDoc(config, cb));
});


/**
 * Cleans the coverage directory
 */
gulp.task('clean-coverage', () => gulp.src(coverageDir, { read: false}).pipe(rm()));

/**
 * Run all previous tasks in sequence
 */
gulp.task('build', cb => runSequence('beautify', 'docs', cb));

/**
 * Starts nodemon based on nodemon options
 */
gulp.task('start', () => nodemon(nodemonOpts));

/**
 * Run build task by default
 */
gulp.task('default', ['start']);


