const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/chartjs/' // Yahaan 'vue-app' ko apne folder ke naam se replace karein
})
