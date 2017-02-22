const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./config/webpack-parts.config');
const dotenv = require('dotenv');
const pkg = require('./package.json');

dotenv.config();

const PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
        path.join(__dirname, 'node_modules/bootstrap/dist/css/', 'bootstrap.min.css'),
        path.join(__dirname, 'app/assets/css/', 'main.css')
    ],

    build: path.join(__dirname, 'build')
};

const common = {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        app: PATHS.app,
        style: PATHS.style,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
        // Tweak this to match your GitHub project name
        // publicPath: '/',
        // filename: '[name].[hash].js',
        // This is used for require.ensure. The setup
        // will work without but this is useful to set.
        // chunkFilename: '[chunkhash].js'
    },
    // Important! Do not remove ''. If you do, imports without
    // an extension won't work anymore!
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo 02'
        }),
        new FaviconsWebpackPlugin(path.join(PATHS.app, '/assets/img/my-logo.png'))
    ],
    module: {
        loaders: [

            // ES6, React
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference 
                query: {
                    presets: ['react', 'es2015']
                }
            },

            // Fonts
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
            }
        ]
    }
};

var config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common,
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    // This is used for require.ensure. The setup
                    // will work without but this is useful to set.
                    chunkFilename: '[chunkhash].js'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractBundle({
                name: 'vendor',
                entries: ['react', 'react-dom', 'jquery']
            }),
            parts.minify(),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS([PATHS.app])
        );
        break;
    default:
        config = merge(
            common,
            parts.setupCSS(PATHS.style),
            {
                devtool: 'source-map'
            },
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config);
