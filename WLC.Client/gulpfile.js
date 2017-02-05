/// <binding />
var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  msbuild = require("gulp-msbuild"),
  robocopy = require('robocopy'),
  nunit = require('gulp-nunit-runner'),
  Server = require('karma').Server;

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

gulp.task("clean css and js", ["clean:js", "clean:css"]);

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

gulp.task("minify css and js", ["min:js", "min:css"]);

gulp.task("build", function () {
    return gulp.src("../WLC.sln")
        .pipe(msbuild({
            targets: ['Clean', 'Build'],
            toolsVersion: 12.0,
            errorOnFail: true,
            stdout: true,
            logCommand: true
        })
        );
});

gulp.task('deploy', function () {
    return robocopy({
        source: '../WLC.Client',
        destination: '../Publish',
        files: ['*.config', '*.html', '*.htm', '*.js', '*.dll', '*.pdb',
                '*.png', '*.jpg', '*.jpeg', '*.gif', '*.css'],
        copy: {
            mirror: true
        },
        file: {
            excludeFiles: ['packages.config', 'gulpfile.js'],
            excludeDirs: ['obj', 'Properties', 'node_modules'],
        },
        retry: {
            count: 2,
            wait: 3
        }
    });
});

gulp.task('runTests', ['build'], function () {
    return gulp
        .src(['../WLC.UnitTest_E2E/bin/*.dll'], { read: false })
        .pipe(nunit({
            teamcity: true
        }));
});

gulp.task('test', function (done) {
    new Server({
        configFile: '../WLC.UnitTest_Script/karma.conf.js',
        singleRun: true
    }, done).start();
});
