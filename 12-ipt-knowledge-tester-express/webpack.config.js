const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');

const PATHS = {
    app: path.join(__dirname, 'app/index.js'),
    indextHtmlTemplate: path.join(__dirname, 'app/index.html'),
    images: (__dirname, 'app/assets/img'),
    style: [
        path.join(__dirname, 'node_modules/bootstrap/dist/css/', 'bootstrap.min.css'),
        path.join(__dirname, 'app/assets/css/', 'main.css'),
        path.join(__dirname, 'app/assets/css/', 'animation.css')
    ],

    build: path.join(__dirname, 'build')
};

var config = {
    entry: {
        app: PATHS.app,
        style: PATHS.style,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
        publicPath: "/"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            //JS and JSX with babel
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },

            //CSS
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.style
            },

            // Fonts
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
            },

            // Images
            {
                test: /\.(jpg|png)$/,
                loader: 'file?name=[path][name].[hash].[ext]',
                include: PATHS.images
            }

        ]
    },
    plugins: [
        // Generate index.html automatically
        new HtmlWebpackPlugin({
            template: PATHS.indextHtmlTemplate,
            title: 'IPT Knowledge Tester'
        }),

        // Enable multi-pass compilation for enhanced performance
        // in larger projects. Good default.
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        })
    ],
    devtool: 'eval-source-map',
    devServer: {
        // Publick path folder content will be served from
        publicPath: "/",

        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        // Unlike the cli flag, this doesn't set
        // HotModuleReplacementPlugin!
        hot: true,
        inline: true,

        // Display only errors to reduce the amount of output.
        // stats: 'errors-only',
        stats: 'normal',

        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,

        proxy: {
            '/api/*': {
                target: 'http://localhost:9000/',
                secure: false
            }
        },
    },

};

module.exports = validate(config);
