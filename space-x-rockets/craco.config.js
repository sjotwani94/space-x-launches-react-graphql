const { ModuleFederationPlugin } = require('webpack').container;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            if (env === 'development') {
                // Add the React Refresh Webpack Plugin in development mode for the remote app
                webpackConfig.plugins.push(new ReactRefreshWebpackPlugin());
            }
            webpackConfig.plugins.push(
                new ModuleFederationPlugin({
                    name: 'remoteApp', // The name of your remote app
                    filename: 'remoteEntry.js', // The filename for the remote entry
                    exposes: {
                        './App': path.resolve(__dirname, 'src/App'), // Expose a component
                    },
                    shared: {
                        react: { singleton: true, eager: true },
                        'react-dom': { singleton: true, eager: true },
                        '@mui/icons-material': { singleton: true, eager: true },
                        '@mui/material': { singleton: true, eager: true },
                        graphql: { singleton: true, eager: true },
                        '@apollo/client': { singleton: true, eager: true },
                    },
                }),
            );

            // Remove any existing SCSS rules to avoid conflicts with the default ones
            webpackConfig.module.rules[1].oneOf = webpackConfig.module.rules[1].oneOf.filter(
                (rule) => !rule.test?.toString().includes('scss'),
            );

            // Add your custom SCSS rule at the end to ensure it is applied last
            webpackConfig.module.rules.push({
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader', // Inject styles into the DOM
                    'css-loader', // Turns CSS into JS
                    'sass-loader', // Compiles Sass to CSS
                ],
            });

            // Log the final configuration to verify the rules
            console.log(webpackConfig.module.rules);

            return webpackConfig;
        },
    },
};

// module.exports = {
//     mode: 'development',
//     entry: './src/index.tsx',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'remoteEntry.js',
//         publicPath: 'auto', // Set to 'auto' for relative path loading in dev mode
//     },
//     resolve: {
//         extensions: ['.ts', '.tsx', '.js'],
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(ts|tsx)$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//             },
//         ],
//     },
//     devServer: {
//         contentBase: path.join(__dirname, 'dist'),
//         port: 4200, // Port for the remote application
//         hot: true,
//         historyApiFallback: false,
//     },
//     optimization: {
//         runtimeChunk: false,
//         minimize: false,
//     },
//     plugins: [
//         new (require('webpack').container.ModuleFederationPlugin)({
//             name: 'remoteApp',
//             filename: 'remoteEntry.js',
//             exposes: {
//                 './App': './src/App', // Exposing a component
//             },
//             shared: ['react', 'react-dom'],
//         }),
//     ],
// };
