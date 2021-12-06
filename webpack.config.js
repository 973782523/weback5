const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
module.exports = {
    mode:'development',
    entry: {
        index: './src/index.js',
        // index:{
        //     import: './src/index.js',
        //     dependOn: 'shared'
        // },
        // 第二个入口
        // print: './src/print.js'
        // another: './src/another.js',
        // another:{
        //     import: './src/another.js',
        //     dependOn: 'shared'
        // },
        // shared:'lodash'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        // 清除之前的dist
        clean: true,
        // library: "webpackNumbers",
        // publicPath: '/',
    },
    // 跟踪报错的部分
    devtool: 'inline-source-map',
    plugins: [
        // 生成index.html, 这样就不需要自己引入
        new HtmlWebpackPlugin({
            title: 'development',
        }),

    ],
    devServer: {
        static: './dist',
    },
    module: {
        //  npm install style-loader css-loader -D
        rules: [
            {
                test: /\.css/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
        ]
    },
    optimization: {
        // 如果我们要在一个 HTML 页面上使用多个入口时，还需设置
        runtimeChunk: 'single',
        // 生成的id 每次都会变化,去掉就不会变化,但是如果没有改变, 生成的id就不会变化
        moduleIds: 'deterministic',
        // 将之前的示例中重复的 lodash 模块去除
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
}
