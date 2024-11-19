const { ModuleFederationPlugin } = require('webpack').container;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            if (env === 'development') {
                // Add the React Refresh Webpack Plugin in development mode
                webpackConfig.plugins.push(new ReactRefreshWebpackPlugin());
            }

            webpackConfig.plugins.push(
                new ModuleFederationPlugin({
                    name: 'hostApp', // The name of the host app
                    remotes: {
                        remoteApp: 'remoteApp@http://localhost:4200/remoteEntry.js', // Remote entry URL
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

            return webpackConfig;
        },
    },
};

// module.exports = {
//     mode: 'development',
//     entry: './src/index.tsx',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'main.js',
//         publicPath: 'auto',
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
//         port: 3000, // Port for the host application
//         hot: true,
//     },
//     optimization: {
//         runtimeChunk: false,
//         minimize: false,
//     },
//     plugins: [
//         new (require('webpack').container.ModuleFederationPlugin)({
//             name: 'hostApp',
//             remotes: {
//                 remoteApp: 'remoteApp@http://localhost:4200/remoteEntry.js', // URL to load remote app's entry
//             },
//             shared: ['react', 'react-dom'],
//         }),
//     ],
// };
