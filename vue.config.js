const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Tenshiba Calendar',
    themeColor: '#2aa198',
  },
})
