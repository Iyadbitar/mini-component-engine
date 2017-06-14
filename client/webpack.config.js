const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const distDir = path.resolve(__dirname, '../dist');

module.exports = {
    entry: './main.js',
    output: {
        path: distDir,
        filename: 'bundle.js'
    },
    module:{
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            plugins: ["transform-decorators-legacy"],
            presets: ['es2015', 'stage-2']
          }
        },
        {
          test: /\.component\.html$/,
          exclude: /node_modules/,
          loader: "raw-loader"
        },
        {
          test: /\.component\.css$/,
          exclude: /node_modules/,
          loaders: [ 'style-loader', 'css-loader?localIdentName=[name]__[local]--[hash:base64:5]' ]
        }
      ]
      // rules:[
      //   {
      //     test: /\.js$/,
      //     loader: 'babel',
      //     exclude: '/node_modules',
      //     options:{
      //       presets:['es2015', 'stage-2']
      //     }
      //   }
      // ]
    },
    plugins: [
       new CopyWebpackPlugin([{ from: './index.html', to: distDir + '/index.html' }])
    ],
    devtool:'source-map'
};
