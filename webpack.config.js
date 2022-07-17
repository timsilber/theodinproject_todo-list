const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
              },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
              },
        ]
    },
    
    devServer: {
        static: './dist',
    },
    devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            title: 'todo!',
            inject: 'head',
            template: './src/index.html',
            filename: 'index.html'
        })
    ],

    optimization: {
        runtimeChunk: 'single',
      },
};