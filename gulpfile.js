'use strict';

// Include Gulp
var gulp = require('gulp');

// LGulp Config
var config = require('./config.json');

// Load gulp plugins from package.json
var plugins = require('gulp-load-plugins')();

// Load Node Packaged Modules
var rimraf = require('rimraf');

gulp.task('sass', function () {
    return gulp.src('app/styles/sass/**/*.scss')
        .pipe(plugins.sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('styles', function () {
    return gulp.src('app/styles/sass/**/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
    return gulp.src('app/*.html')
        .pipe(plugins.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(plugins.if('*.js', plugins.uglify()))
        .pipe(plugins.if('*.css',  plugins.csso()))
        .pipe(plugins.useref.restore())
        .pipe(plugins.useref())
        .pipe(gulp.dest( config.distFolder ));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(plugins.cache(plugins.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest( config.distFolder+'/'+config.images ));
});

gulp.task('fonts', function () {
    var streamqueue = require('streamqueue');
    return streamqueue({objectMode: true},
            plugins.bowerFiles(),
            gulp.src('app/fonts/**/*')
        )
        .pipe(plugins.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe(plugins.flatten())
        .pipe(gulp.dest( config.distFolder+'/'+config.fonts ));
});

gulp.task('extras', function () {
    return gulp.src( ['app/*.*', '!app/**/*.html'], {dot: true})
        .pipe(gulp.dest( config.distFolder ));
});

gulp.task('clean', function (cb) {
    rimraf('.tmp' , function () {
        rimraf( config.distFolder, cb);
    });
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')( config.livereload ))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        // paths to bower_components should be relative to the current file
        // e.g. in app/index.html you should use ../bower_components
        .use('/bower_components', connect.static('bower_components'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen( config.server )
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:' + config.server );
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:' + config.server );
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/sass/**/*.scss')
        .pipe(wiredep({directory: 'bower_components'}))
        .pipe(gulp.dest('app/styles/sass'));

    gulp.src('app/**/*.html')
        .pipe(wiredep({
            directory: 'bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    plugins.livereload.listen();

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', plugins.livereload.changed);

    gulp.watch( 'app/styles/sass/**/*.scss', ['sass']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('zip', function() {
    return gulp.src( config.distFolder+'/*' )
        .pipe(plugins.zip( config.filename ))
        .pipe(gulp.dest( config.distFolder ));
});

// gulp.task('build', ['clean', 'jshint', 'html', 'images', 'fonts', 'extras', 'zip'], function () {
//     return gulp.src( config.distFolder+'/**/*').pipe(plugins.size({title: 'build', gzip: true}));
// });
gulp.task('build', ['clean'], function () {
    gulp.start('jshint', 'html', 'images', 'fonts', 'extras', 'zip', function () {
        return gulp.src( config.distFolder+'/**/*').pipe(plugins.size({title: 'build', gzip: true}));
    });
});

gulp.task('default', ['watch']);