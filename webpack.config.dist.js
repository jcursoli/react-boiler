const path = require('path');

const sourcePath = path.join(__dirname, './src');

module.exports = {
  entry: './src/components/carousel/carousel.jsx',
  output: {
    library: 'Carousel',
    libraryTarget: 'umd',
    filename: 'carousel.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use:
        [{ loader: 'style-loader' },
        { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
        { loader: 'sass-loader' }],
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
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
};
