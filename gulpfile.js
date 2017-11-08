const gulp = require('gulp');
const file = require('gulp-file');
const eslint = require('gulp-eslint');
const rollup = require('rollup').rollup;
const babel =require('rollup-plugin-babel');

gulp.task('default', ['lint'], () => {
  return rollup({
    input: 'src/index.js',
    plugins: [
      babel({
        presets: ['react', 'es2015-rollup'],
        plugins: [
          "transform-class-properties",
          "transform-object-rest-spread"
        ],
        babelrc: false,
        exclude: 'node_modules/**'
      })
    ]
  })
  .then(bundle => {
    return bundle.generate({
      format: 'umd',
      name: 'muhelm'
    });
  })
  .then(gen => {
    return file('index.js', gen.code, {src: true})
      .pipe(gulp.dest('dist'));
});
});

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});