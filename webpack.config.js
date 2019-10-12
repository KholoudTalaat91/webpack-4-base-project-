// plugins
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// modules
const js = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"]
    }
  }
};

const pug = {
  test: /\.pug$/,
  use: ["html-loader?attrs=false", "pug-html-loader"]
};

const sass = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      // This loader resolves url() and @imports inside CSS
      loader: "css-loader"
    },
    {
      // Then we apply postCSS fixes like autoprefixer and minifying
      loader: "postcss-loader"
    },
    {
      // First we transform SASS to standard CSS
      loader: "sass-loader",
      options: {
        implementation: require("sass")
      }
    }
  ]
};

const babel = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"]
    }
  }
};

const images = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: "file-loader",
      options: {
        // youtputPath:
        name: "[path][name].[ext]"
      }
    }
  ]
};

const fonts = {
  test: /\.(woff|woff2|ttf|otf|eot)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "fonts/"
      }
    }
  ]
};
const videos = {
  test: /\.(mp4|mov|wav)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: "file-loader",
  options: {
    name: "[path][name].[ext]"
  }
};
module.exports = {
  entry: { index: "./src/js/index.js" },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },

  mode: "development",

  module: {
    rules: [js, pug, sass, babel, images, fonts]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: path.resolve(__dirname, "src/pug/index.pug"),
      minify: false,
      hash: true,
      chunks: ["index"]
      // chunksSortMode: "manual"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "assets/images"),
        to: path.resolve(__dirname, "dist/assets/images")
      }
    ])
    // for vid if found
    // new CopyWebpackPlugin([{
    //   from: path.resolve(__dirname, 'assets/videos'),
    //   to: path.resolve(__dirname, 'dist/assets/videos')
    // }])
  ]
};
