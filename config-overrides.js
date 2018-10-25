const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const paths = require('react-scripts/config/paths');
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
const cssFilename = 'static/css/[name].[contenthash:8].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
    : {};
module.exports = function override(config, env) {
    if (!config.externals) {
        config.externals = {};
    }

    if (process.env.NODE_ENV === 'production') {
        config.externals.jodit = 'Jodit';
    }

    config.module.rules[1].oneOf.forEach(function (rule) {
            if (rule.test && rule.test.toString() === /\.css$/.toString()) {
                if (process.env.NODE_ENV !== 'production') {
                    rule.use[1].options.modules = true;
                    rule.use[1].options.localIdentName = "[name]__[local]___[hash:base64:5]"
                } else {
                    rule.loader = ExtractTextPlugin.extract(
                        Object.assign(
                            {
                                fallback: {
                                    loader: require.resolve('style-loader'),
                                    options: {
                                        hmr: false,
                                    },
                                },
                                use: [
                                    {
                                        loader: require.resolve('css-loader'),
                                        options: {
                                            importLoaders: 1,
                                            minimize: true,
                                            modules: true,
                                            sourceMap: shouldUseSourceMap,
                                        },
                                    },
                                    {
                                        loader: require.resolve('postcss-loader'),
                                        options: {
                                            // Necessary for external CSS imports to work
                                            // https://github.com/facebookincubator/create-react-app/issues/2677
                                            ident: 'postcss',
                                            plugins: () => [
                                                require('postcss-flexbugs-fixes'),
                                                autoprefixer({
                                                    browsers: [
                                                        '>1%',
                                                        'last 4 versions',
                                                        'Firefox ESR',
                                                        'not ie < 9', // React doesn't support IE8 anyway
                                                    ],
                                                    flexbox: 'no-2009',
                                                }),
                                            ],
                                        },
                                    },
                                ],
                            },
                            extractTextPluginOptions
                        )
                    )
                }
        }
    });

    return config;
};