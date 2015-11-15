// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var autoprefixer = require('gulp-autoprefixer');

var angular_app_root = 'app';
var angular_app_module_js = [angular_app_root + '/**/*.js', "!" + angular_app_root + '/templates.js'];
var angular_app_module_html = angular_app_root + '/**/*.html';
var angular_app_module_scss = angular_app_root + '/**/*.scss';

var node_modules_root = "node_modules";
var node_modules_js = [
    node_modules_root + "/angular/angular.js",
    node_modules_root + "/angular-animate/angular-animate.js",
    node_modules_root + "/angular-aria/angular-aria.js",
    node_modules_root + "/angular-material-source/dist/angular-material.js",
    node_modules_root + "/angular-material-icons/angular-material-icons.js",
];
var node_modules_css = [
    node_modules_root + "/angular-material-source/dist/angular-material.css",
    node_modules_root + "/angular-material-icons/angular-material-icons.css",
];

var django_static_path = 'record/static/record/';

// Angular templates
gulp.task('templates', function () {
  return gulp.src(angular_app_module_html)
    .pipe(templateCache({'standalone':1}))
    .pipe(gulp.dest(django_static_path));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(angular_app_module_js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(angular_app_module_scss)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(concat('index.css'))
        .pipe(gulp.dest(django_static_path));
});

// Concat JS
gulp.task('scripts', function() {
    return gulp.src(angular_app_module_js)
        .pipe(concat('index.js'))
        .pipe(gulp.dest(django_static_path));
});

// NPM js
gulp.task('npm-js', function() {
    gulp.src(node_modules_js)
        .pipe(concat("vendor.js"))
        //.pipe(uglify())
        .pipe(gulp.dest(django_static_path));
});

// NPM css
gulp.task('npm-css', function() {
    gulp.src(node_modules_css)
        .pipe(concat("vendor.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest(django_static_path));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(angular_app_module_html, ['templates']);
    gulp.watch(angular_app_module_js, ['lint', 'scripts']);
    gulp.watch(angular_app_module_scss, ['sass']);
    gulp.watch(node_modules_root, ['npm-js', 'npm-css']);
});



// Default Task
gulp.task('default', ['templates', 'lint', 'sass', 'scripts', 'npm-js', 'npm-css', 'watch']);

