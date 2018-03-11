const path = require('path');

module.exports = {
  entry: './src/typewriter.js',
  output: {
    path: path.resolve(__dirname, 'lib/'),
    library: 'Typewriter',
    filename: 'typewriter.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    sourceMapFilename: '../maps/typewriter.js.map'
  },
  devtool: "source-map",
  externals: [
    {
      lodash: {
        root: '_',
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash'
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
  ]
};
