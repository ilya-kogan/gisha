var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpSass = require("gulp-sass");
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var gulpImagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var autoprefixer = require("gulp-autoprefixer");
var ftp = require("vinyl-ftp");
var sassGlob = require('gulp-sass-glob');
var notify = require("gulp-notify");
var rimraf = require("rimraf");
var sourcemaps = require('gulp-sourcemaps');

//Scripts
var sassPaths = [
  "app/libs/normalize.scss/sass",
  "app/libs/foundation-sites/scss",
  "app/libs/motion-ui/src"
];

function commonJs(cb) {
  gulp
    .src(["app/js/common.js"])
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
  cb();
}

function js(cb) {
  gulp
    .src([
      "app/libs/slick-slider/slick.min.js"
    ])
    .pipe(concat("libs.min.js"))
    // .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
  cb();
}

function browser(cb) {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
  });
  cb();
}

function code(cb) {
  gulp.src("app/*.html").pipe(
    browserSync.reload({
      stream: true
    })
  );
  cb();
}

function sass(cb) {
  gulp
    .src([
      "app/scss/**/*.scss",
      "app/libs/slick-slider/slick.min.css"
    ])
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(gulpSass().on("error", notify.onError()))
    .pipe(autoprefixer(["last 2 versions"]))
    .pipe(
      cleanCSS({
        format: "keep-breaks"
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(concat("style.css"))
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
  cb();
}

function watch(cb) {
  gulp.watch("app/scss/**/*.scss", gulp.parallel(sass));
  gulp.watch("app/js/common.js", gulp.parallel(commonJs));
  gulp.watch("app/**/*.html", gulp.parallel(code));
  cb();
}

function imagemin(cb) {
  gulp
    .src("app/img/**/*")
    .pipe(cache(gulpImagemin()))
    .pipe(gulp.dest("dist/img"));
  cb();
}

function deploy(cb) {
  var conn = ftp.create({
    host: "hostname.com",
    user: "username",
    password: "userpassword",
    parallel: 10,
    log: gutil.log
  });

  var globs = ["dist/**", "dist/.htaccess"];
  gulp
    .src(globs, {
      buffer: false
    })
    .pipe(conn.dest("/path/to/folder/on/server"));
  cb();
}

function files(cb) {
  var buildFiles = gulp
    .src(
      [
        "app/**/*.html"
      ],
      {
        allowEmpty: true
      }
    )
    .pipe(gulp.dest("dist"));

  var buildCss = gulp.src(["app/css/style.css"]).pipe(gulp.dest("dist/css"));

  var buildJs = gulp
    .src(
      ["app/js/scripts.min.js", "app/js/common.min.js", "app/js/common.js"],
      {
        allowEmpty: true
      }
    )
    .pipe(gulp.dest("dist/js"));

  var fonts = gulp
    .src(["app/fonts/**/*"], {
      allowEmpty: true
    })
    .pipe(gulp.dest("dist/fonts"));

  var libs = gulp
    .src(["app/libs/jquery/**/*"], {
      allowEmpty: true
    })
    .pipe(gulp.dest("dist/libs/jquery"));
  cb();
}

function remDist(cb) {
  rimraf("dist", cb);
}

function clearCache(cb) {
  cache.clearAll();
  cb();
}

exports.build = gulp.series(remDist, gulp.parallel(imagemin, sass, js), files);
exports.clearcache = gulp.parallel(clearCache);
exports.js = gulp.parallel(js);
exports.default = gulp.parallel(watch, browser);