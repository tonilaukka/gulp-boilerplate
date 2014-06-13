# Gulp Boilerplate
Sets up a front-end development enviroment using [Gulp](http://gulpjs.com/) for the build process.

## Features
Some of the features.
- Automatically compile Sass
- Automatically lint your Scripts
- Automagically wire-up dependencies installed with [Bower](http://bower.io)
- Built in preview server with LiveReload
- CSS Autoprefixing and minification
- Image optimization
- Sass Compilation
- Script minification

Please see the [gulpfile.js](gulpfile.js) for all the tasks.

## Dependencies
- Download and install [NodeJS](http://nodejs.org/)
- Install [Bower](http://bower.io/) `npm install -g bower`
- Install [Gulp](http://gulpjs.com/) `npm install -g gulp`

## Getting Started
- Clone the repo `git clone https://github.com/tonilaukka/gulp-boilerplate.git`
- Run `bower install`
- Run `npm install`

### Basic usage
- Run `gulp` to start the preview server and LiveReload
- Run `gulp build` to build
- Rund `gulp zip` to build and zip

### Third-Party Dependencies
To install dependencies, `bower install --save package-name` to get the files and then add a `script` or `style` tag to your `index.html` or another appriate place.

#### Adding jQuery
- Run `bower install --save jquery`
- Import jquery.js in the end of the [index.html](app/index.html)
```html
        <!-- build:js scripts/main.js -->
        <!-- bower:js -->
        <script src="../bower_components/jquery/dist/jquery.js"></script>
        <!-- endbower -->

        <script src="scripts/main.js"></script>
        <!-- endbuild -->
    </body>
</html>
```

#### Adding Bootstrap Sass
- Run `bower install --save bootstrap-sass-official`
- Import bootstrap.scss the beginning of in the beginning of be [main.scss](app/styles/sass/main.scss)
```sass
// app/styles/main.scss

// bower:scss
@import "../../../bower_components/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap";
// endbower
```

- Import bootstrap.js in the end of the [index.html](app/index.html)
```html
        <!-- build:js scripts/main.js -->
        <!-- bower:js -->
        <script src="../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap.js"></script>
        <!-- endbower.js -->

        <script src="scripts/main.js"></script>
        <!-- endbuild -->
    </body>
</html>
```

### Configuration
To change dist folder names and server ports see [config.json](config.json).
```json
{
  "distFolder": "dist",
  "fonts": "fonts",
  "images": "images",
  "livereload": 35729,
  "server": 9001,
  "filename": "site.zip"
}
```

