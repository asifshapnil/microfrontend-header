const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");
const path = require('path');


module.exports = {
    entry: "./src/entry.js",
    mode: "development",
    devServer: {
        port: 3001, 
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ModuleFederationPlugin({ 
            name: "HeaderApp",  
            filename: "remoteEntry.js",  
            exposes: { 
                "./Header": "./src/App", 
            },
            remotes: {
                HomeApp: 'HomeApp@https://microfrontend-home-two.vercel.app/remoteEntry.js',
            },
            shared: {  
                ...dependencies,  
                react: { 
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": { 
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
            },
        }),
    ],
    resolve: {
        alias: {
            ajv: path.resolve(__dirname, 'node_modules/ajv')
        },
        extensions: [".js", ".jsx"],
    },
    target: "web",
    optimization: {
        runtimeChunk: false,
    },
};