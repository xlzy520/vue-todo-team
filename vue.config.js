'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: '8888',
    open: false,
    overlay: {
      // warnings: false,
      // errors: false
    },
    proxy: {
      '/': {
        target: `http://localhost:5000`,
        changeOrigin: true,
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          /** 其实我们发现打包生成的 runtime.js非常的小，gzip 之后一般只有几 kb，但这个文件又经常会改变，
          我们每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，所以建议不要将它单独拆包，
           而是将它内联到我们的 index.html 之中(index.html 本来每次打包都会变)。
          这里我选用了 script-ext-html-webpack-plugin，主要是因为它还支持preload和 prefetch，
         正好需要就不想再多引用一个插件了，你完全可以使用 inline-manifest-webpack-plugin或者
          assets-webpack-plugin等来实现相同的效果。
          **/
          // config
          //   .plugin('ScriptExtHtmlWebpackPlugin')
          //   .after('html')
          //   .use('script-ext-html-webpack-plugin', [{
          //   // `runtime` must same as runtimeChunk name. default is `runtime`
          //     inline: /runtime\..*\.js$/
          //   }])
          //   .end()
          // config.optimization.splitChunks({
          //     chunks: 'all',
          //     cacheGroups: {
          //       libs: {
          //         name: 'chunk-libs',
          //         test: /[\\/]node_modules[\\/]/,
          //         priority: 10,
          //         chunks: 'initial' // only package third parties that are initially dependent
          //       },
          //       elementUI: {
          //         name: 'chunk-elementUI', // split elementUI into a single package
          //         priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          //         test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          //       },
          //       commons: {
          //         name: 'chunk-commons',
          //         test: resolve('src/components'), // can customize your rules
          //         minChunks: 3, //  minimum common number
          //         priority: 5,
          //         reuseExistingChunk: true
          //       }
          //     }
          //   })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
