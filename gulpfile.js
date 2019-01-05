const {
  dest,
  series,
  src,
  task,
  watch,
} = require('gulp');
const { createProject } = require('gulp-typescript');

const del = require('del');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const chronosProject = createProject('tsconfig.json')

const SCRIPTS_PATH = 'src/chronos/**/*.ts';
const DIST_PATH = 'src/dist';
const DEMO_PATH = 'demo/dist';

task('clean', async function() {
  await del([DIST_PATH, DEMO_PATH]);
});

task('scripts', function() {
  return src(SCRIPTS_PATH)
    .pipe(plumber(function (err) {
      console.log('SCRIPTS TASK ERROR');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(chronosProject())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest(DIST_PATH));
});

task('default', series('clean', 'scripts'));

watch(SCRIPTS_PATH, task('default'));