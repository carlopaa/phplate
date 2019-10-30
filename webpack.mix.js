let path = require('path');
let glob = require('glob-all');
let mix = require('laravel-mix');

require('laravel-mix-purgecss');

const webpackConfig = {
    resolve: {
        alias: {
            '@': path.resolve('./src'),
            'styles': path.resolve('./src/sass'),
            'scripts': path.resolve('./src/js'),
        }
    }
};

const purgeCssConfig = {
    enabled: mix.inProduction(),
    folders: ['src'],
    paths: () => glob.sync([
        path.join(__dirname, 'src/js/**/*.js'),
        path.join(__dirname, 'public/**/*.php'),
        path.join(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.js')
    ]),
    extensions: ['js', 'php']
};

const extract = [
    'bootstrap',
    'jquery',
    'popper.js'
];

const browserSyncConfig = {
    proxy: 'phplate.test',
    open: false,
    files: ['./public']
};

mix.setPublicPath('public')
    .js(['src/js/main.js'], 'public/assets/js')
    .sass('src/sass/main.scss', 'public/assets/css')
    .extract(extract)
    .purgeCss(purgeCssConfig)
    .webpackConfig(webpackConfig)
    .browserSync(browserSyncConfig)
    .version();
