/**
 * @author: @Misha
 */

const webpack = require("webpack");
const helpers = require("./helpers");

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require("assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlElementsPlugin = require("./html-elements-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

/*
 * Webpack Constants
 */
const METADATA = {
    title: "Vanilla",
    baseUrl: "/",
    isDevServer: helpers.isWebpackDevServer(),
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
    isProd = options.env === "production";
    return {

        /*
         * Cache generated modules and chunks to improve performance for multiple incremental builds.
         * This is enabled by default in watch mode.
         * You can pass false to disable it.
         *
         * See: http://webpack.github.io/docs/configuration.html#cache
         */
        //cache: false,

        /*
         * The entry point for the bundle
         * Our Angular.js app
         *
         * See: http://webpack.github.io/docs/configuration.html#entry
         */
        entry: {
            "main": "./src/app.ts",
        },

        /*
         * Options affecting the resolving of modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve: {

            /*
             * An array of extensions that should be used to resolve modules.
             *
             * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
             */
            extensions: [".ts", ".js"],

            // An array of directory names to be resolved to the current directory
            modules: [helpers.root("src"), "node_modules"],

        },

        /*
         * Options affecting the normal modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module: {
            loaders: [{
                    test: /\.ts?$/,
                    loader: "ts-loader",
                }, {
                    test: /\.html$/,
                    loader: "html-loader",
                    exclude: [helpers.root("src/index.html")],
                },
                /*
                 * Json loader support for *.json files.
                 *
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test: /\.json$/,
                    loader: "json-loader",
                },

                /*
                 * to string and css loader support for *.css files
                 * Returns file content as string
                 *
                 */
                {
                    test: /\.css$/,
                    loaders: ["to-string-loader", "css-loader"],
                }, {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    loaders: ["raw-loader", "sass-loader"], // sass-loader not scss-loader
                },
                // /* Raw loader support for *.html
                //  * Returns file content as string
                //  *
                //  * See: https://github.com/webpack/raw-loader
                //  */
                // {
                //     test: /\.html$/,
                //     loader: "raw-loader",
                //     exclude: [helpers.root("src/index.html")],
                // },

                /* File loader for supporting images, for example, in CSS files.
                 */
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: "file",
                },
            ],
        },

        /*
         * Add additional plugins to the compiler.
         *
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins: [
            new AssetsPlugin({
                path: "dist",
                filename: "webpack-assets.json",
                prettyPrint: true,
            }),
            /*
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             *
             * Copies project static assets.
             *
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            new CopyWebpackPlugin([{
                from: "src/assets",
                to: "assets",
            }, {
                from: "src/meta",
            }]),


            /*
             * Plugin: HtmlWebpackPlugin
             * Description: Simplifies creation of HTML files to serve your webpack bundles.
             * This is especially useful for webpack bundles that include a hash in the filename
             * which changes every compilation.
             *
             * See: https://github.com/ampedandwired/html-webpack-plugin
             */
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                title: METADATA.title,
                chunksSortMode: 'dependency',
                metadata: METADATA,
                inject: 'head',
            }),

            /*
             * Plugin: ScriptExtHtmlWebpackPlugin
             * Description: Enhances html-webpack-plugin functionality
             * with different deployment options for your scripts including:
             *
             * See: https://github.com/numical/script-ext-html-webpack-plugin
             */
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: "defer",
            }),

            /*
             * Plugin: HtmlElementsPlugin
             * Description: Generate html tags based on javascript maps.
             *
             * If a publicPath is set in the webpack output configuration, it will be automatically added to
             * href attributes, you can disable that by adding a "=href": false property.
             * You can also enable it to other attribute by settings "=attName": true.
             *
             * The configuration supplied is map between a location (key) and an element definition object (value)
             * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
             *
             * Example:
             *  Adding this plugin configuration
             *  new HtmlElementsPlugin({
             *    headTags: { ... }
             *  })
             *
             *  Means we can use it in the template like this:
             *  <%= webpackConfig.htmlElements.headTags %>
             *
             * Dependencies: HtmlWebpackPlugin
             */
            new HtmlElementsPlugin({
                headTags: require("./head-config.common"),
            }),

            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new LoaderOptionsPlugin(),

        ],

        /*
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            crypto: "empty",
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false,
        },
    };
};