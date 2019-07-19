const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const resolve = file => path.resolve(__dirname, file);

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.vue']
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000 // 10Kb
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
