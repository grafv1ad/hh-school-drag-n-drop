const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const mode = process.env.NODE_ENV || 'development';
const isDevMode = mode === 'development';

const target = isDevMode ? 'web' : 'browserslist';

module.exports = {
    mode,
    target,
    devtool: 'source-map',
    devServer: {
        port: 4200,
        open: false,
    },
    entry: {
        main: path.resolve(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new BrowserSyncPlugin({
              host: 'localhost',
              port: 3000,
              proxy: 'http://localhost:4200/'
            }, {
              reload: false
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', 
                                { targets: "defaults" },
                            ],
                        ],
                    },
                },
            },
        ],
    },
}
