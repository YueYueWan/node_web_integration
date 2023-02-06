/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-12 17:04:27
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-02-03 11:15:30
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  requireConfigFile: false,
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 200000,
    assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
    }
}
})

