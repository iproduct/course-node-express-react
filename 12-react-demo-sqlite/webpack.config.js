module.exports = {
    entry: ["./app.js"],
    output: {
        filename: "bundle.js"
    },
    watch: true,
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
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'eval-source-map',
    devServer: {
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

}