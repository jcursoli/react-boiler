const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourcePath = path.join(__dirname, './src');
const extractSass = new ExtractTextPlugin('main.css');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use:
          extractSass.extract([
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                modules: true,
                sourceMap: true,
              },
            },
            'sass-loader',
          ]),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
  plugins: [
    extractSass,
  ],
};
