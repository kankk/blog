const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');

const resolve = file => path.resolve(__dirname, file);

module.exports = merge(base, {
  entry: {
    client: resolve('../src/entry-client.js')
  },
  plugins: [
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
      filename: 'index.html'
    })
  ]
});
