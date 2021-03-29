const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let isDev = process.env.NODE_ENV === "development";

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "",
    },

    mode: isDev ? "development" : "production",
    devtool: isDev ? "source-map" : undefined,
    devServer: {
        contentBase: path.join(__dirname, ""),
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                // use: {
                //     loader: "babel-loader",
                //     options: {
                //         presets: ["@babel/preset-env"],
                //     },
                // },
                generator: {
                    filename: 'js/[name][ext]'
                },
            },

            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'images/[name].[hash][ext]'
                },
            },

            {
                test: /\.svg$/,
                type: "asset/inline",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: "asset/resource",
                generator: {
                    filename: 'fonts/[name].[hash][ext]'
                },
            },
        ],
    },
};
