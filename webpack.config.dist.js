const path = require('path');

const sourcePath = path.join(__dirname, './src');

module.exports = {
  entry: './src/components/carousel/carousel.jsx',
  output: {
    filename: 'carousel.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: ['css-loader', 'sass-loader'],
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
  externals: [
    {
      react: 'commonjs react',
      'react-dom': 'commonjs react-dom',
    },
  ],
};
