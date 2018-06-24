const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =
{
    entry: ['babel-polyfill', './src/js/index.js'],
    output:
    {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer:
    {
        contentBase: './dist'
    },
    plugins:
    [
        new HtmlWebpackPlugin
        ({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ExtractTextPlugin({ filename: 'css/app.css' })
    ],
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract (
                {
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }
        ]
    },
    devtool: 'source-map'
};