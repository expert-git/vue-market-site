const webpack = require("webpack");
// const {BundleStatsWebpackPlugin} = require("bundle-stats");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StatsPlugin = require("stats-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let isProduction = process.env.NODE_ENV === "production";

module.exports = {
    configureWebpack: {
        output: {
            globalObject: isProduction ? `(typeof self === 'undefined' ? this : self)` : 'this',
        },
        performance: {
            hints: isProduction ? "warning" : false,
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    extractComments: {
                        condition: /^\**!|@preserve|@license|@cc_on/i,
                        filename: (file) => {
                            return `${file}.COMMENTS`;
                        },
                        banner(commentsFile) {
                            return `Original comments in this file are in ${commentsFile}`;
                        },
                    },
                    parallel: 4,
                    terserOptions: {
                        compress: true,
                        ie8: true,
                        mangle: true,
                        output: {
                            beautify: false,
                        },
                        safari10: true,
                        warnings: false,
                    },
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace("@", "")}`;
                        },
                        reuseExistingChunk: true,
                        test: /[\\/]node_modules[\\/]/,
                    },
                    styles: {
                        test: /\.css$/,
                        name: true,
                        chunks: 'all',
                        enforce: true,
                    },
                },
                chunks: "all",
                maxAsyncRequests: 20,
                maxInitialRequests: 20,
            },
            moduleIds: "hashed",
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin({
                hashDigest: "hex",
                hashDigestLength: 20,
                hashFunction: "sha256",
            }),
            new webpack.ProvidePlugin({
                'Promise': ['core-js', 'Promise'],
            }),
            // new BundleStatsWebpackPlugin(),
            new StatsPlugin("stats.json"),
        ],
        stats: "normal"
    },
    runtimeCompiler: false,
};
