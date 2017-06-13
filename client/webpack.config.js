const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
          test: /\.component.html$/,
          exclude: /node_modules/,
          loader: "raw-loader"
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
    // plugins: [
    //    new CopyWebpackPlugin([{ from: './index.html', to: distDir + '/index.html' }])
    // ],
    devtool:'source-map'
};
