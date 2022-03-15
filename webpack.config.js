/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');

module.exports = (env, { mode }) => {
  const isDevelopment = mode === 'development';
  return {
    entry: ['core-js/stable', 'regenerator-runtime', './src/index.tsx'],
    mode: isDevelopment ? 'development' : 'production',
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './assets/js/[name].js',
      publicPath: '',
      clean: true,
    },
    devServer: {
      hot: true,
      static: {
        directory: `${__dirname}/public`,
        publicPath: '/',
      },
      historyApiFallback: true,
      compress: true,
    },
    devtool: isDevelopment ? 'source-map' : false,
    ...(!isDevelopment
      ? {
          performance: {
            hints: false,
          },
          optimization: {
            minimize: true,
            minimizer: [
              new TerserWebpackPlugin({
                extractComments: false,
                parallel: true,
                terserOptions: {
                  mangle: {
                    safari10: true,
                  },
                  format: {
                    comments: false,
                  },
                },
              }),
              new CssMinimizerWebpackPlugin({
                minimizerOptions: {
                  preset: [
                    'default',
                    {
                      discardComments: { removeAll: true },
                    },
                  ],
                },
              }),
            ],
            splitChunks: {
              chunks: 'all',
              minSize: 10000,
              maxSize: 250000,
              cacheGroups: {
                vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
                },
              },
            },
          },
        }
      : {}),
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractWebpackPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'tailwindcss',
                    [
                      'postcss-preset-env',
                      {
                        stage: 0,
                        autoprefixer: { grid: true },
                        features: {
                          'focus-visible-pseudo-class': false,
                        },
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new DotEnvWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public/assets',
            to: 'assets',
            globOptions: {
              gitignore: true,
            },
          },
        ],
      }),
      !isDevelopment &&
        new MiniCssExtractWebpackPlugin({
          filename: './assets/styles/[name].css',
        }),
      !isDevelopment &&
        new PreloadWebpackPlugin({
          rel: 'preload',
          as(entry) {
            if (/\.css$/.test(entry)) return 'style';
            if (/\.ttf$/.test(entry)) return 'font';
            if (/\.png|jpg|jpeg|ico$/.test(entry)) return 'image';
            return 'script';
          },
          include: 'allAssets',
          fileBlacklist: [/\.map$/, /hot-update\.js$/],
        }),
      !isDevelopment &&
        new PreloadWebpackPlugin({
          rel: 'prefetch',
          include: 'asyncChunks',
        }),
    ].filter(Boolean),
  };
};
