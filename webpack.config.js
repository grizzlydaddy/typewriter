import webpack from 'webpack';
import package from './package.json';
var banner = `
  ${package.name} - ${package.description}
  Author: ${package.author}
  Version: v${package.version}
  Url: ${package.homepage}
  License(s): ${package.license}
`;

export default {
  entry: {
    Typed: './src/typewriter.js'
  },
  output: {
    path: __dirname,
    library: 'Typewriter',
    libraryTarget: 'umd',
    filename: `typewriter.js`
  },
  devtool: '#inline-source-map',
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
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          compact: false
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};
