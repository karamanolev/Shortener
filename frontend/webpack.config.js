const path = require('path');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src', 'main.js'),
        html: path.join(__dirname, 'index.html'),
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015',
                        'react',
                    ],
                },
            },
            {
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]",
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8889,
        proxy: {
            '/v1': 'http://127.0.0.1:8888',
        }
    },
};