const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: `./src/index.js`,
    output: {
        filename: `bundle.js`,
        path: path.join(__dirname, `public`)
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 4000,
        open: true,
        historyApiFallback: true
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "styles.css"
    })],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    devtool: `source-map`,
    mode: 'development',
    resolve: {
        extensions: [`.js`, `.jsx`]
    },
};