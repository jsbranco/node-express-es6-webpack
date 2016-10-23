var webpack = require("webpack");

var isProd = (process.env.NODE_ENV === 'production');

// Conditionally return a list of plugins to use based on the current environment.
// Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
  var plugins = [];

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
    }
  }));

  // Conditionally add plugins for Production builds.
  if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  // Conditionally add plugins for Development
  else {
    // ...
  }

  return plugins;
}

// Export Webpack configuration.
module.exports = {
  plugins: getPlugins(),
  entry: "./server/index.js",
  target: 'node',
  output: {
    path: __dirname,
    filename: "dist/bundle.js"
  },
  module: {

    loaders: [
      {
        loader: 'json-loader',
        test: /(server\/.*\.json$|\.json$)/
      },
      {
        test: /server\/.*\.js?$/,
        exclude: ["node_modules"],
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
