const { VUE_APP_SERVER } = process.env

module.exports = {
  devServer: {
    overlay: false,
    proxy: {
      '/serverApi': {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/serverApi': 'http://192.168.0.70:3001'
        }
      }
    }
  }
}

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
