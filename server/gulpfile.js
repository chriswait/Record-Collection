// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var vendor = require('gulp-concat-vendor');
var autoprefixer = require('gulp-autoprefixer');

var angular_app_root = 'app';
var angular_app_module_js = [angular_app_root + '/**/*.js', "!" + angular_app_root + '/templates.js'];
var angular_app_module_html = angular_app_root + '/**/*.html';
var angular_app_module_scss = angular_app_root + '/**/*.scss';

var bower_components_root = 'bower_components'
var bower_components_js = bower_components_root + '/*';
var bower_components_material_css = bower_components_root + '/angular-material/angular-material.css';

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

// Fetch bower JS dependencies
gulp.task('bower', function() {
    gulp.src(bower_components_js)
        .pipe(vendor('vendor.js'))
        .pipe(gulp.dest(django_static_path)); 
});

// Fetch angular materialcss dependency
gulp.task('material', function() {
    gulp.src(bower_components_material_css)
        .pipe(gulp.dest(django_static_path)); 
});

// Watch
gulp.task('watch', function() {
    gulp.watch(angular_app_module_html, ['templates']);
    gulp.watch(angular_app_module_js, ['lint', 'scripts']);
    gulp.watch(angular_app_module_scss, ['sass']);
    gulp.watch(bower_components_root + "/*/*.js", ['bower']);
    gulp.watch(bower_components_material_css, ['material']);
});

// Default Task
gulp.task('default', ['templates', 'lint', 'sass', 'scripts', 'bower', 'material', 'watch']);

