var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify");



var paths = {
    scriptPath: "./Scripts/",
    cssPath: "./Content/CSS/"
};

paths.js = paths.scriptPath + "**/*.js";
paths.minJs = paths.scriptPath + "**/*.min.js";
paths.css = paths.cssPath + "*.css";
paths.minCss = paths.cssPath + "*.min.css";
paths.concatJsDest = paths.scriptPath + "site.min.js";
paths.concatCssDest = paths.cssPath + "site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:css", function () {
    return gulp.src([
        './Content/CSS/bootstrap.css',
        './Content/CSS/font-awesome.css',
        './Content/CSS/ionicons.css',
        './Content/CSS/AdminLTE.css',
        './Content/CSS/skin-blue.css'
    ]).pipe(concat(paths.concatCssDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

gulp.task("min:js", function () {
    return gulp.src([
        './Scripts/Api/angular.js',
        './Scripts/Api/jquery.js',
        './Scripts/Api/bootstrap.js',
        './Scripts/Api/app.js',
        './Scripts/App/App.js',
        './Scripts/App/Service/CommonService.js',
        './Scripts/App/Controller/IndexController.js',
        './Scripts/App/Controller/ListController.js',
        './Scripts/App/Controller/RaporController.js'
    ], { base: "." })
      .pipe(concat(paths.concatJsDest))
      .pipe(uglify({ mangle: false }))
      .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
