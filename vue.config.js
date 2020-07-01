const path = require("path");
const webpack = require("webpack");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir);
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
  },

  chainWebpack: config => {
    config.resolve.alias.set("@$", resolve("src")).set("@views", resolve("src/views"));
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_API_HOST,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api/": "/api/",
          logLevel: "debug"
        }
      }
    }
  },

  assetsDir: "static",
  runtimeCompiler: true
};
